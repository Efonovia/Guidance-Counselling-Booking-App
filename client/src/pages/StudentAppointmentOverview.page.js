import React from 'react';
import { httpGetCurrentAppointment, httpGetMessagesByAppointment, httpSendMessage } from '../requests.hooks';
import { useSelector } from 'react-redux';
import { formatDate, formatTime, getStatus, getStatusColor, centerStyle } from '../utils';
import { CircularProgress } from '@mui/material';


function StudentAppointmentOverview() {
    const userInfo = useSelector(state => state.user)
    const [appointmentDetails, setAppointmentDetails] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [currentMessages, setCurrentMessages] = React.useState(null)
    const [messageContent, setMessageContent] = React.useState("")


    function getStyles() {
		switch(userInfo.type) {
			case "student":
				return {
                    background: "#6EF84C",
                    border: "1px solid #6EF84C"
                }
			case "counselor":
				return {
                    background: "#4c6ef8",
                    border: "1px solid #4c6ef8"
                }
			case "admin":
				return {
                    background: "black",
                    border: "1px solid black",
                    color: "white"
                }
			default:
				return {
                    background: "#4c6ef8",
                    border: "1px solid #4c6ef8"
                }
		}
	}

    function onMessageChange(event) {
        setMessageContent(event.target.value)
    }

    async function submitMessage() {
        const messageDetails = {
            sender: {
                id: userInfo._id,
                name: userInfo.firstName + " " + userInfo.lastName,
                type: "student",
                picture: userInfo.picturePath
            },
            receiver: {
                id: appointmentDetails.counselorId,
                name: appointmentDetails.counselorName,
                type: "counselor",
                picture: appointmentDetails.counselorPicture
            },
            appointmentId: appointmentDetails._id,
            messageContent,
        }

        console.log(messageDetails)
        setMessageContent("")
        try {
            const sentMessageResult = await httpSendMessage(messageDetails)
            setCurrentMessages(prev => [...prev, sentMessageResult.body])
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpGetCurrentAppointment(userInfo.schoolId);
                setAppointmentDetails(result);

                const messagesResult = await httpGetMessagesByAppointment(result._id)
                setCurrentMessages(messagesResult.body)
            } catch (error) {
                console.error('Error fetching appointment:', error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
        
    }, [userInfo.schoolId])

    const messagesHTML = currentMessages?.map(message => {
        if(message.sender.id === userInfo._id) {
            return <div key={message._id} className="single_message_chat">
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src={`http://localhost:8000/${message.sender.type}s/pic/${message.sender.picture}`} alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>{message.sender.name}</h4>
                                <p>{formatDate(message.dateSent)} by {formatTime(message.dateSent)}</p>
                            </div>
                        </div>
                        <div style={getStyles()} className="message_content_view red_border">
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
                            <img src={`http://localhost:8000/${message.sender.type}s/pic/${message.sender.picture}`} alt=""/>
                        </div>
                    </div>
                    <div style={{background: "#c8c8c8"}} className="message_content_view">
                        <p style={{color: "black"}}>{message.messageContent}</p>
                    </div>
                </div>
    })

    return loading ? <CircularProgress size={100} sx={{color: "black", margin: "150px 300px"}}/> : <div className="messages_box_area">
                <div className="messages_list">
                    <div style={{height: "77vh", overflowY: "auto", alignItems: "start", gap: "10px"}} className="white_box cen-col">
                        {appointmentDetails ? <>
                        <h2 style={{color: "black", marginTop: "20px", fontSize: "22px", textDecoration: "underline"}}>Appointment Details</h2>
                        <h3 style={{lineHeight: "1.4", paddingTop: "15px", fontSize: "20px"}}>Student ID:&nbsp;<span>{appointmentDetails.studentSchoolId}</span></h3>
                        <h3 style={{lineHeight: "1.4", paddingTop: "15px", fontSize: "20px"}}>Counselor:&nbsp;<span>{appointmentDetails.counselorName}</span></h3>
                        <h3 style={{lineHeight: "1.4", paddingTop: "15px", fontSize: "20px", ...centerStyle}}>Status:&nbsp;&nbsp;<span style={{...getStatusColor(getStatus(appointmentDetails)), ...centerStyle, fontSize: "12px", borderRadius: "5px", padding: "5px 10px"}}>{getStatus(appointmentDetails)}</span></h3>
                        <h3 style={{lineHeight: "1.4", paddingTop: "15px", fontSize: "20px"}}>Appointment Date/Time:&nbsp;<span>{formatDate(appointmentDetails.appointmentDate)} by {formatTime(appointmentDetails.appointmentDate)}</span></h3>
                        <h3 style={{lineHeight: "1.4", paddingTop: "15px", fontSize: "20px"}}>Is a Referral?:&nbsp;<span>{appointmentDetails.isReferral ? "Yes" : "No"}</span></h3>
                        <h3 style={{lineHeight: "1.4", paddingTop: "15px", fontSize: "20px"}}>Note:&nbsp;<span>{appointmentDetails.note}</span></h3>
                        {appointmentDetails.isReferral && <><h3 style={{lineHeight: "1.4", paddingTop: "15px", fontSize: "20px"}}>Referrer Name:&nbsp;<span>{appointmentDetails.referralInfo.name}</span></h3>
                        <h3 style={{lineHeight: "1.4", paddingTop: "15px", fontSize: "20px"}}>Referrer Email:&nbsp;<span>{appointmentDetails.referralInfo.email}</span></h3></>}
                        </> : <h2 style={{textAlign: "center", color: "black"}}>You don't have any appointment at the moment</h2>}
                    </div>
                </div>
                <div className="messages_chat mb_30">
                    <h3 style={{color: "black", fontSize: "20px", textAlign: "center"}}>Message your Counselor, {userInfo.firstName}</h3>
                    <div style={{height: "55vh", overflowY: "auto"}} className="white_box ">{messagesHTML}</div>
                    <div style={{position: "sticky", marginTop: "-30px"}} className="message_send_field">
                        <textarea value={messageContent} onChange={onMessageChange} rows={2} style={{resize: "none", borderRadius: "5px", padding: "5px"}} placeholder="Write your message"/>
                        <button onClick={submitMessage} style={getStyles()} className="btn_1" type="submit">Send</button>
                    </div>
                </div>
            </div>
}



export default StudentAppointmentOverview