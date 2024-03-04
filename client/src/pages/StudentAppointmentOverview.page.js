import React from 'react';
import { httpGetCurrentAppointment } from '../requests.hooks';
import { useSelector } from 'react-redux';


function StudentAppointmentOverview() {
    const userInfo = useSelector(state => state.user)
    console.log(userInfo)
    const [appointmentDetails, setAppointmentDetails] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

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
            } catch (error) {
                console.error('Error fetching appointment:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [userInfo.schoolId])

    return <div className="messages_box_area">
                <div className="messages_list">
                    <div style={{height: "77vh", overflowY: "auto", alignItems: "start", gap: "10px"}} className="white_box cen-col">
                        <h2 style={{paddingBottom: "20px", color: "black"}}>Appointment Details</h2>
                        {appointmentDetails ? <>
                        <h3 id={`${userInfo.type}_color`} style={{paddingTop: "15px", fontSize: "24px"}}>Counselor:&nbsp;<span>Nasir Jones</span></h3>
                        <h3 id={`${userInfo.type}_color`} style={{paddingTop: "15px", fontSize: "24px"}}>Date/Time of Appointment:&nbsp;<span>Nasir Jones</span></h3>
                        <h3 id={`${userInfo.type}_color`} style={{paddingTop: "15px", fontSize: "24px"}}>Status:&nbsp;<span>Nasir Jones</span></h3>
                        <h3 id={`${userInfo.type}_color`} style={{paddingTop: "15px", fontSize: "24px"}}>Date Created:&nbsp;<span>Nasir Jones</span></h3>
                        <h3 id={`${userInfo.type}_color`} style={{paddingTop: "15px", fontSize: "24px"}}>Notes:&nbsp;<span>Nasir Jones</span></h3>
                        <h3 id={`${userInfo.type}_color`} style={{paddingTop: "15px", fontSize: "24px"}}>Referrer:&nbsp;<span>Nasir Jones</span></h3>
                        </> : <h2>You don't have any appointment at the moment</h2>}
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