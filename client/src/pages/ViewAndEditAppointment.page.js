import React from 'react';


function ViewAndEditAppointment() {


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
                    <div style={{height: "77vh", overflowY: "auto"}} className="white_box ">
                    <div className="modal-content cs_modal">
                            <div className="modal-header theme_bg_1 justify-content-center">
                                <h5 className="modal-title text_white">Edit Appointment</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <input type="text" className="form-control" placeholder="Student's School ID" />
                                    </div>
                                    <div>
                                        <input type="date" className="form-control" placeholder="Date of Appointment" />
                                    </div>
                                    <div>
                                        <input type="time" className="form-control" placeholder="Time of Appointment" />
                                    </div>
                                    <div>
                                        <textarea placeholder='Notes' cols={30} rows={1} style={{resize: "none", lineHeight: "25px", height: "70px"}}></textarea>
                                    </div>
                                    <a style={{cursor: "pointer"}} href className="btn_1 full_width text-center">Approve & Create</a>
                                    <a style={{cursor: "pointer", background: "red"}} href className="btn_1 full_width text-center">Reject</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}



export default ViewAndEditAppointment