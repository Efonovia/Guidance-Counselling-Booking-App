import React from 'react';
import { 
    httpGetAllAppointments, 
    httpGetAllCounselors, 
    httpGetMessagesBetweenCounselors, 
    httpGetMessagesByAppointment, 
    httpGetStudent, 
    httpSendMessage, 
    httpViewMessage 
} from '../requests.hooks';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { formatDate, formatTime } from '../utils';
import defaultStudentPic from "../assets/img/default_student.png"
import { setNotifications } from '../state';


function MessagesPage() {
    const dispatch = useDispatch()
    const messagesRef = React.useRef(null)

    const userInfo = useSelector(state => state.user)
    const notificationsInfo = useSelector(state => state.notifications)

    const [messageContent, setMessageContent] = React.useState("")
    const [contactList, setContactList] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [selectedContact, setSelectedContact] = React.useState(null)
    const [currentContactMessages, setCurrentContactMessages] = React.useState(null)
    const [currentContactMessagesLoading, setCurrentContactMessagesLoading] = React.useState(true)

    async function getCounselorChatList(counselorId, isAdmin) {
        try {
            let chatList = []
            const counselors = await httpGetAllCounselors()
            counselors?.filter(counselor => {
                let query
                if(isAdmin) {
                    query = counselor._id !== counselorId
                } else {
                    query = counselor.isAdmin && (counselor._id !== counselorId)
                }
                return query
            }).forEach(counselor => {
                chatList.push({
                    personId: counselor._id, 
                    type: "counselor", 
                    personName: counselor.firstName + " " + counselor.lastName, 
                    picture: counselor.picturePath,
                    appointmentId: null
                })
            })
            let appointments = await httpGetAllAppointments(counselorId)
            const formattedAppointments = []
            appointments.body.forEach(appointment => {
                if(!appointment.completed && appointment.studentId) {
                    formattedAppointments.push({studentId: appointment.studentId, appointmentId: appointment._id})
                }
            })

            const formattedResponses = await Promise.all(
                formattedAppointments?.map(async formattedAppointment => {
                    const studentInfo = await httpGetStudent(formattedAppointment.studentId)
                    return {
                        personId: formattedAppointment.studentId,
                        type: "student",
                        personName: studentInfo.firstName + " " + studentInfo.lastName,
                        picture: studentInfo.picturePath,
                        appointmentId: formattedAppointment.appointmentId
                    }
                }
            ))

            chatList.push(...formattedResponses)
            return chatList
        } catch (error) {
            console.log(error)
        }
    }

    async function markAllAsRead() {
        let unreadMessagesIds = []
        notificationsInfo?.messageNotificationsDetails?.forEach(message => {
            unreadMessagesIds.push(...message.unseenMessagesIds)
        })

        const allResults = await Promise.all(
            unreadMessagesIds?.map(async id => (await httpViewMessage(id)).ok)
        )

        console.log(allResults)

        if(allResults.every(res => res)) {
            dispatch(setNotifications({ notifications: { unApprovedAppointments: notificationsInfo.unApprovedAppointments, messageNotificationsDetails: [] } }))
        }
    }

    async function viewContactMessages(person) {
        setSelectedContact(person)
        try {
            if(person.type === "student") {
                const messagesResult = await httpGetMessagesByAppointment(person.appointmentId)
                setCurrentContactMessages(messagesResult?.body)
            } else if(person.type === "counselor") {
                const messagesResult = await httpGetMessagesBetweenCounselors(userInfo._id, person.personId)
                setCurrentContactMessages(messagesResult?.body)
                console.log(messagesResult?.body)
            }
            if(messagesRef.current !== null) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight
            }
            setMessageContent("")
        } catch (error) {
            console.log(error)
        } finally {
            setCurrentContactMessagesLoading(false)
        }   
    }

    function onMessageChange(event) {
        setMessageContent(event.target.value)
    }

    async function submitMessage() {
        if(!Boolean(messageContent)) {
            alert("can't send an empty message")
            return
        }
        const messageDetails = {
            sender: {
                id: userInfo._id,
                name: userInfo.firstName + " " + userInfo.lastName,
                type: "counselor",
                picture: userInfo.picturePath
            },
            receiver: {
                id: selectedContact.personId,
                name: selectedContact.personName,
                type: selectedContact.type,
                picture: selectedContact.picture
            },
            appointmentId: selectedContact.appointmentId,
            messageContent,
        }

        console.log(messageDetails)
        setMessageContent("")
        try {
            const sentMessageResult = await httpSendMessage(messageDetails)
            setCurrentContactMessages(prev => [...prev, sentMessageResult.body])
            if(messagesRef.current !== null) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCounselorChatList(userInfo._id, userInfo.isAdmin);
                setContactList(result);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [userInfo._id, userInfo.isAdmin])

    const messagesHTML = currentContactMessages?.map(message => {
        const imageSrc = message.sender.type === "student" ? defaultStudentPic : `https://res.cloudinary.com/dn6uuvy0b/image/upload/v1725657663/${message.sender.picture}`
        if(message.sender.id === userInfo._id) {
            return <div key={message._id} className="single_message_chat">
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img style={{objectFit: "cover"}} src={imageSrc} alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>{message.sender.name}</h4>
                                <p>{formatDate(message.dateSent)} by {formatTime(message.dateSent)}</p>
                            </div>
                        </div>
                        <div className="message_content_view red_border">
                            <p>{message.messageContent}</p>
                        </div>
                    </div>
        }
        return <div key={message._id} className="single_message_chat sender_message">
                    <div className="message_pre_left">
                        <div className="messges_info">
                            <h4>{message.sender.name}</h4>
                            <p>{formatDate(message.dateSent)} by {formatTime(message.dateSent)}</p>
                        </div>
                        <div className="message_preview_thumb">
                            <img style={{objectFit: "cover"}} src={imageSrc} alt=""/>
                        </div>
                    </div>
                    <div style={{background: "#c8c8c8"}} className="message_content_view">
                        <p style={{color: "black"}}>{message.messageContent}</p>
                    </div>
                </div>
    })

    const sortedContactList = contactList?.sort((a,b) => {
        const A = notificationsInfo.messageNotificationsDetails?.find(noti => noti.personId === a.personId)?.unseenMessages
        const B = notificationsInfo.messageNotificationsDetails?.find(noti => noti.personId === b.personId)?.unseenMessages
        return B-A
    })
    const contactListHTML = sortedContactList?.map(person => {
        const imageSrc = person.type === "student" ? defaultStudentPic : `https://res.cloudinary.com/dn6uuvy0b/image/upload/v1725657663/${person.picture}`
        const notification = notificationsInfo.messageNotificationsDetails?.find(noti => noti.personId === person.personId)?.unseenMessages
        return <li onClick={()=>viewContactMessages(person)} style={{cursor: "pointer"}} key={person.personId}>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img style={{objectFit: "cover"}} src={imageSrc} alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4 style={{textDecoration: person.personId === selectedContact?.personId ? "underline": "none"}}>{person.personName}</h4>
                                <p>{person.type}</p>
                            </div>
                            {Boolean(notification) && <div className='cen-col' style={{background: "red", color: "white", fontSize: "10px", height: "15px", width: "15px", borderRadius: "100%"}}>{notification}</div>}
                        </div>
                    </a>
                </li>
    })

    return loading ? <CircularProgress size={100} sx={{color:'black', margin: "150px 400px"}}/> : <div className="messages_box_area">
                <div className="messages_list">
                    <div className="white_box ">
                        <div className="white_box_tittle list_header">
                            <h4 style={{textAlign: "center"}}>Recipients</h4>
                            {Boolean(notificationsInfo.messageNotificationsDetails.length) && <div onClick={markAllAsRead} style={{background: "blue", color: "white", textAlign: "center", padding: "3px 6px", borderRadius: "3px", cursor: "pointer"}} className='cen-row'>Mark all as read</div>}
                        </div>
                        <ul style={{height: "50vh", overflowY: "auto"}}>{contactListHTML}</ul>
                    </div>
                </div>
                {selectedContact ? (currentContactMessagesLoading ? <CircularProgress sx={{color:'black', marginTop: "150px", marginLeft: "200px"}} size={100}/> : <div className="messages_chat mb_30">
                    {currentContactMessages?.length ? <div ref={messagesRef} style={{height: "55vh", overflowY: "auto"}} className="white_box ">{messagesHTML}</div>: <h3 style={{color: "black", textAlign: "center", height: "55vh"}}>You have no messages with {selectedContact.personName}</h3>}
                    <div style={{position: "sticky", marginTop: "-20px"}} className="message_send_field">
                        <textarea value={messageContent} onChange={onMessageChange} rows={2} style={{resize: "none", borderRadius: "5px", padding: "5px"}} placeholder="Send a message"/>
                        <button className="btn_1" type="submit" onClick={submitMessage}>Send</button>
                    </div>
                </div>) : <h2 style={{color: "black", textAlign: "center"}}>Select a contact to view it's messages</h2>}
            </div>
}


export default MessagesPage