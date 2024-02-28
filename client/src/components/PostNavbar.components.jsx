import React from 'react';
import profilePhoto from "../assets/img/client_img.png"

function PostNavbar({ children }) {


    return <section>
			<div className="container-fluid g-0">
				<div className="row">
					<div className="col-lg-12 p-0">
						<div className="header_iner d-flex justify-content-between align-items-center">
							<div className="sidebar_icon d-lg-none">
								<i className="ti-menu"></i>
							</div>
							<div className="serach_field-area d-flex align-items-center">
								<div className="search_inner">
									<form action="#">
										<div className="search_field">
											<input
												type="text"
												placeholder="Search here..."
											/>
										</div>
										<button type="submit">
											<img
												src="img/icon/icon_search.svg"
												alt="alt"
											/>
										</button>
									</form>
								</div>
								<span
									className="f_s_14 f_w_400 ml_25 white_text text_white"
									>Apps</span>
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
				<div className="container-fluid p-0">{children}</div>
			</div>
    </section>
}


export default PostNavbar