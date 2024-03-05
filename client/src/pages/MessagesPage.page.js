import React from 'react';
import { httpGetAllAppointments, httpGetAllCounselors, httpGetStudent } from '../requests.hooks';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';


function MessagesPage() {
    const userInfo = useSelector(state => state.user)

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

    const contactListHTML = contactList?.map(person => {
        return <li style={{cursor: "pointer"}} key={person.personId}>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src={`http://localhost:8000/${person.type}s/pic/${person.picture}`} alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>{person.personName}</h4>
                                <p>{person.type === "student" ? "Student Appointment" : "Admin"}</p>
                            </div>
                        </div>
                    </a>
                </li>
    })

    return loading ? <CircularProgress size={100} sx={{color:'black', margin: "150px 400px"}}/> : <div className="messages_box_area">
                <div className="messages_list">
                    <div className="white_box ">
                        <div className="white_box_tittle list_header">
                            <h4 style={{textAlign: "center"}}>All Counselors</h4>
                        </div>
                        <ul style={{height: "50vh", overflowY: "auto"}}>{contactListHTML}</ul>
                    </div>
                </div>
                <div className="messages_chat mb_30">
                    <div style={{height: "65vh", overflowY: "auto"}} className="white_box ">
                        <div className="single_message_chat">
                            <div className="message_pre_left">
                                <div className="message_preview_thumb">
                                    <img src="img/messages/1.png" alt=""/>
                                </div>
                                <div className="messges_info">
                                    <h4>Travor James</h4>
                                    <p>Yesterday at 6.33 pm</p>
                                </div>
                            </div>
                            <div className="message_content_view red_border">
                                <p>
                                    how are you doing
                                </p>
                            </div>
                        </div>
                        <div className="single_message_chat sender_message">
                            <div className="message_pre_left">
                                <div className="messges_info">
                                    <h4>Agatha Kristy</h4>
                                    <p>Yesterday at 6.33 pm</p>
                                </div>
                                <div className="message_preview_thumb">
                                    <img src="img/messages/1.png" alt=""/>
                                </div>
                            </div>
                            <div className="message_content_view">
                                <p>
                                    how are you doing
                                </p>
                            </div>
                        </div>
                        <div className="single_message_chat sender_message">
                            <div className="message_pre_left">
                                <div className="messges_info">
                                    <h4>Agatha Kristy</h4>
                                    <p>Yesterday at 6.33 pm</p>
                                </div>
                                <div className="message_preview_thumb">
                                    <img src="img/messages/1.png" alt=""/>
                                </div>
                            </div>
                            <div className="message_content_view">
                                <p>
                                    how are you doing
                                </p>
                            </div>
                        </div>
                        <div className="single_message_chat sender_message">
                            <div className="message_pre_left">
                                <div className="messges_info">
                                    <h4>Agatha Kristy</h4>
                                    <p>Yesterday at 6.33 pm</p>
                                </div>
                                <div className="message_preview_thumb">
                                    <img src="img/messages/1.png" alt=""/>
                                </div>
                            </div>
                            <div className="message_content_view">
                                <p>
                                    how are you doing
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{position: "sticky", marginTop: "-20px"}} className="message_send_field">
                        <textarea rows={3} style={{resize: "none", borderRadius: "5px", padding: "5px"}} placeholder="Write your message"/>
                        <button className="btn_1" type="submit">Send</button>
                    </div>
                </div>
            </div>
}


export default MessagesPage