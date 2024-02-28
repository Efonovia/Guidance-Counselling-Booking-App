import React from 'react';


function CounselorLogin() {


    return <div style={{marginTop: "4vh"}} className="main_content_iner ">
    <div className="container-fluid p-0">
        <div className="row justify-content-center">
            <div className="col-12">
                <div className="dashboard_header mb_50">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="dashboard_header_title">
                                <h3 style={{textAlign: "center"}}>Login as a Counselor</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="white_box mb_30">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}


export default CounselorLogin