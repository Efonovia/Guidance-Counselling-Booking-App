import React from 'react';
import { httpGetCurrentAppointment, httpGetMessagesByAppointment } from '../requests.hooks';
import { useSelector } from 'react-redux';
import { formatDate, formatTime, getStatus, getStatusColor, centerStyle } from '../utils';
import { CircularProgress } from '@mui/material';


function StudentAppointmentOverview() {
    const userInfo = useSelector(state => state.user)
    const [appointmentDetails, setAppointmentDetails] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [messages, setMessages] = React.useState([])

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
                    border: "1px solid black"
                }
			default:
				return {
                    background: "#4c6ef8",
                    border: "1px solid #4c6ef8"
                }
		}
	}

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpGetCurrentAppointment(userInfo.schoolId);
                setAppointmentDetails(result);

                const messagesResult = await httpGetMessagesByAppointment(result._id)
                setMessages(messagesResult)
            } catch (error) {
                console.error('Error fetching appointment:', error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
        
    }, [userInfo.schoolId])

    // const messagesHTML = messages.map(message => {
    //     return 
    // })

    return loading ? <CircularProgress size={100} sx={{color: "black", margin: "150px 300px"}}/> : <div className="messages_box_area">
                <div className="messages_list">
                    <div style={{height: "77vh", overflowY: "auto", alignItems: "start", gap: "10px"}} className="white_box cen-col">
                        {appointmentDetails ? <>
                        <h2 style={{color: "black", marginTop: "20px", fontSize: "22px", textDecoration: "underline"}}>Appointment Details</h2>
                        <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Student ID:&nbsp;<span>{appointmentDetails.studentSchoolId}</span></h3>
                        <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Counselor:&nbsp;<span>{appointmentDetails.counselorName}</span></h3>
                        <h3 style={{paddingTop: "15px", fontSize: "20px", ...centerStyle}}>Status:&nbsp;&nbsp;<span style={{...getStatusColor(getStatus(appointmentDetails)), ...centerStyle, fontSize: "12px", borderRadius: "5px", padding: "5px 10px"}}>{getStatus(appointmentDetails)}</span></h3>
                        <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Appointment Date/Time:&nbsp;<span>{formatDate(appointmentDetails.appointmentDate)} by {formatTime(appointmentDetails.appointmentDate)}</span></h3>
                        <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Is a Referral?:&nbsp;<span>{appointmentDetails.isReferral ? "Yes" : "No"}</span></h3>
                        <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Note:&nbsp;<span>{appointmentDetails.note}</span></h3>
                        {appointmentDetails.isReferral && <><h3 style={{paddingTop: "15px", fontSize: "20px"}}>Referrer Name:&nbsp;<span>{appointmentDetails.referralInfo.name}</span></h3>
                        <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Referrer Email:&nbsp;<span>{appointmentDetails.referralInfo.email}</span></h3></>}
                        </> : <h2 style={{textAlign: "center", color: "black"}}>You don't have any appointment at the moment</h2>}
                    </div>
                </div>
                <div className="messages_chat mb_30">
                    <h3 style={{color: "black"}}>Message your Counselor, {userInfo.firstName}</h3>
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
                            <div style={getStyles()} className="message_content_view red_border">
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
                            <div style={{background: "#c8c8c8"}} className="message_content_view">
                                <p style={{color: "black"}}>
                                    how are you doing
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{position: "sticky", marginTop: "-30px"}} className="message_send_field">
                        <textarea rows={3} style={{resize: "none", borderRadius: "5px", padding: "5px"}} placeholder="Write your message"/>
                        <button style={getStyles()} className="btn_1" type="submit">Send</button>
                    </div>
                </div>
            </div>
}



export default StudentAppointmentOverview