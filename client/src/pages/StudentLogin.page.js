import React from 'react';
import { useNavigate } from 'react-router-dom';


function StudentLogin() {
    const navigate = useNavigate()

    return <div style={{width: "100vw", height: "100vh", backgroundImage: "url(http://localhost:3000/static/media/home-bg.5bd74799b014ef072512.png)"}} className="main_content_iner ">
                <div className="container-fluid p-0">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="dashboard_header mb_50">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div style={{width: "100%", marginLeft: "50%", marginTop: "20%"}} className="dashboard_header_title">
                                            <h3 style={{textAlign: "center"}}>Login as a Student</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div style={{background: "transparent"}} className="white_box mb_30">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6">

                                        <div className="modal-content cs_modal">
                                            <div className="modal-header justify-content-center theme_bg_1">
                                                <h5 className="modal-title text_white">Log in</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="">
                                                        <input type="text" className="form-control" placeholder="Enter your email"/>
                                                    </div>
                                                    <div className="">
                                                        <input type="password" className="form-control" placeholder="Password"/>
                                                    </div>
                                                    <a href className="btn_1 full_width text-center">Log in</a>
                                                </form>
                                            </div>
                                        </div>
                                            <p onClick={()=>navigate("/student/signup")} style={{color: "blue", fontWeight: 900, cursor: "pointer"}}>Or Signup if you don't have an account</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default StudentLogin