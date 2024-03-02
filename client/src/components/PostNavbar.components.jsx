import React from 'react';
import profilePhoto from "../assets/img/client_img.png"
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeWords } from '../utils';
import "../styles/general.css"
import { setUser } from '../state';
import { useNavigate } from 'react-router-dom';

function PostNavbar({ children, openSideBar }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userInfo = useSelector(state => state.user)
	function getStyles() {
		switch(userInfo.type) {
			case "student":
				return { background: "#6EF84C" }
			case "counselor":
				return { background: "#4c6ef8" }
			case "admin":
				return { background: "black" }
			default:
				return { background: "#4c6ef8" }
		}
	}

	function logout() {
		console.log("rfetgr")
		dispatch(setUser({ user: null }))
		navigate("/")
	}

    return <section style={{paddingBottom: 0}} className="main_content dashboard_part large_header_bg">
			<div className="container-fluid g-0">
				<div className="row">
					<div className="col-lg-12 p-0">
						<div style={getStyles()} className="header_iner d-flex justify-content-between align-items-center">
							<div className="header_right d-flex justify-content-between align-items-center">
								<div style={{width: "1px", marginLeft: "250px"}} className="cen-col">
									<div className='cen-row'>
										<div className='sidebar_icon d-lg-none' onClick={openSideBar}>
											<MenuIcon />
										</div>
										<div className="profile_info">
											<img src={profilePhoto} alt="alt" />
										</div>

										<button onClick={logout}>logout</button>
									</div>
									<div>{userInfo.firstName} {userInfo.lastName}</div>
								</div>

								<h2 style={{textAlign: 'center', paddingLeft: "100px"}}>{capitalizeWords((userInfo.type))} Dashboard</h2>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div style={{marginTop: "-10px"}} className="main_content_iner ">
				<div className="container-fluid p-0">
					<div className="row justify-content-center">
						<div className="col-lg-12">{children}</div>
					</div>
				</div>
			</div>
    </section>
}


export default PostNavbar