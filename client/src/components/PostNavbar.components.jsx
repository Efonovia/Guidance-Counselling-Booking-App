import React from 'react';
import profilePhoto from "../assets/img/client_img.png"

function PostNavbar({ children }) {


    return <section style={{paddingBottom: 0}} className="main_content dashboard_part large_header_bg">
			<div className="container-fluid g-0">
				<div className="row">
					<div className="col-lg-12 p-0">
						<div className="header_iner d-flex justify-content-between align-items-center">
							<div className="sidebar_icon d-lg-none">
								<i className="ti-menu"></i>
							</div>
							<div className="header_right d-flex justify-content-between align-items-center">
								
								<div className="profile_info">
									<img src={profilePhoto} alt="alt" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="main_content_iner ">
				<div className="container-fluid p-0">
					<div className="row justify-content-center">
						<div className="col-lg-12">{children}</div>
					</div>
				</div>
			</div>
    </section>
}


export default PostNavbar