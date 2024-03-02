import React from 'react';


function StudentAppointmentOverview() {


    return <div className="messages_box_area">
                <div className="messages_list">
                    <div style={{height: "77vh", overflowY: "auto"}} className="white_box ">
                        <h2 style={{paddingBottom: "20px"}}>Appointment Details</h2>
                        <h3 style={{paddingTop: "15px"}}><span style={{color: "blue"}}>Name:</span>&nbsp;Nasir Jones</h3>
                        <h3 style={{paddingTop: "15px"}}><span style={{color: "blue"}}>Name:</span>&nbsp;Nasir Jones</h3>
                        <h3 style={{paddingTop: "15px"}}><span style={{color: "blue"}}>Name:</span>&nbsp;Nasir Jones</h3>
                        <h3 style={{paddingTop: "15px"}}><span style={{color: "blue"}}>Name:</span>&nbsp;Nasir Jones</h3>
                        <h3 style={{paddingTop: "15px"}}><span style={{color: "blue"}}>Name:</span>&nbsp;Nasir Jones</h3>
                        <h3 style={{paddingTop: "15px"}}><span style={{color: "blue"}}>Name:</span>&nbsp;Nasir Jones</h3>
                        <h3 style={{paddingTop: "15px"}}><span style={{color: "blue"}}>Name:</span>&nbsp;Nasir Jones</h3>
                        <h3 style={{paddingTop: "15px"}}><span style={{color: "blue"}}>Name:</span>&nbsp;Nasir Jones</h3>
                    </div>
                </div>
                <div className="messages_chat mb_30">
                    <h3>Message your Counselor, Chance</h3>
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
                                <p style={{color: "black"}}>
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
                    <div style={{position: "sticky", marginTop: "-30px"}} className="message_send_field">
                        <textarea rows={3} style={{resize: "none", borderRadius: "5px", padding: "5px"}} placeholder="Write your message"/>
                        <button className="btn_1" type="submit">Send</button>
                    </div>
                </div>
            </div>
}



export default StudentAppointmentOverview