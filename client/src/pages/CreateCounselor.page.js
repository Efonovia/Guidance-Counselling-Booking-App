import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function CreateCounselor() {


    return <div className="white_box mb_30">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="modal-content cs_modal">
                            <div className="modal-header theme_bg_1 justify-content-center">
                                <h5 className="modal-title text_white">Create a New Counselor</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <input type="text" className="form-control" placeholder="First Name" />
                                    </div>
                                    <div>
                                        <input type="text" className="form-control" placeholder="Last Name" />
                                    </div>
                                    <div>
                                        <input type="text" className="form-control" placeholder="Enter your email" />
                                    </div>
                                    <div>
                                        <input type="text" className="form-control" placeholder="Phone Number" />
                                    </div>
                                    <div style={{width: "100%"}} className="col-md-12">
                                        <div style={{border: "1px dashed #2d1967", height: "50px"}} className="input-group">
                                            <div className="custom-file">
                                                <label style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1px"}} className="custom-file-label" htmlFor="inputGroupFile03">
                                                    <span style={{marginTop: "10px"}}> &nbsp;&nbsp;<CloudUploadIcon />&nbsp;Upload photo of counselor</span>
                                                    <input
                                                        type="file"
                                                        style={{display: "none"}}
                                                        name="cv"
                                                        className="custom-file-input"
                                                        id="inputGroupFile03"
                                                        aria-describedby="inputGroupFileAddon03"/><br></br>
                                                        {/* <span style={{marginTop: "-50px", color: "black"}} id="fileName">file name</span> */}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop: "20px"}}>
                                        <input type="password" className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="cs_check_box">
                                        <input type="checkbox" id="check_box" className="common_checkbox" />
                                        <label className="form-label" htmlFor="check_box">
                                            Make admin?
                                        </label>
                                    </div>
                                    <a href className="btn_1 full_width text-center">Create</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default CreateCounselor