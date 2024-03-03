import React from 'react';
import logo from "../assets/img/logo.png"
import PostNavbar from './PostNavbar.components';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';


function Navbar({ children }) {
    const [showSideBar, setShowSideBar] = React.useState(false)
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user)
    const location = useLocation()


    return <> 
                <nav className={`sidebar vertical-scroll ps-container ps-theme-default ps-active-y${showSideBar ? " active_sidebar": ""}`}>
                    <div className="logo d-flex justify-content-between">
                        <a href><img src={logo} alt="alt" /></a>
                        <div onClick={() => setShowSideBar(false)} className="sidebar_close_icon d-lg-none">
                            <CloseIcon/>
                        </div>
                    </div>
                    {userInfo.type === "admin" && <ul id="sidebar_menu">
                        <li onClick={()=>navigate("/admin/schedule")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <CalendarMonthIcon />
                                </div>
                                <span style={{ color: location.pathname === "/counselor/schedule" && "blue" }}>My Schedule</span>
                            </a>
                        </li>
                        <li onClick={()=>navigate("/admin/viewcounselors")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <PeopleIcon />
                                </div>
                                <span style={{ color: location.pathname === "/admin/viewcounselors" && "black" }}>All Counsellors</span>
                            </a>
                        </li>
                        <li onClick={()=>navigate("/admin/createappointment")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <AddIcon />
                                </div>
                                <span style={{ color: location.pathname === "/admin/createappointment" && "black" }}>Create Appointment</span>
                            </a>
                        </li>
                        <li onClick={()=>navigate("/admin/createcounselor")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <PersonAddAltIcon />
                                </div>
                                <span style={{ color: location.pathname === "/admin/createcounselor" && "black" }}>Add New Counsellor</span>
                            </a>
                        </li>
                        <li onClick={()=>navigate("/admin/messages")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <MessageIcon />
                                </div>
                                <span style={{ color: location.pathname === "/admin/messages" && "black" }}>Messages</span>
                            </a>
                        </li>
                    </ul>}

                    {userInfo.type === "counselor" && <ul id="sidebar_menu">
                        <li onClick={()=>navigate("/counselor/schedule")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <CalendarMonthIcon />
                                </div>
                                <span style={{ color: location.pathname === "/counselor/schedule" && "blue" }}>My Schedule</span>
                            </a>
                        </li>
                        <li onClick={()=>navigate("/counselor/createappointment")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <AddIcon />
                                </div>
                                <span style={{ color: location.pathname === "/counselor/createappointment" && "blue" }}>Create Appointment</span>
                            </a>
                        </li>
                        <li onClick={()=>navigate("/counselor/messages")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <MessageIcon />
                                </div>
                                <span style={{ color: location.pathname === "/counselor/messages" && "blue" }}>Messages</span>
                            </a>
                        </li>
                        <li onClick={()=>navigate("/counselor/appointments")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <HowToRegIcon />
                                </div>
                                <span style={{ color: location.pathname === "/counselor/appointments" && "blue" }}>Appointments</span>
                            </a>
                        </li>
                    </ul>}

                    {userInfo.type === "student" && <ul id="sidebar_menu">
                        <li onClick={()=>navigate("/student/appointmentoverview")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <CalendarMonthIcon />
                                </div>
                                <span style={{ color: location.pathname === "/student/appointmentoverview" && "#2ddf00" }}>My Appointment</span>
                            </a>
                        </li>
                        <li onClick={()=>navigate("/student/bookappointment")} style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <AddIcon />
                                </div>
                                <span style={{ color: location.pathname === "/student/bookappointment" && "#2DDF00" }}>Book Appointment</span>
                            </a>
                        </li>
                    </ul>}

                </nav>
                <PostNavbar openSideBar={() => setShowSideBar(true)}>{children}</PostNavbar>
            </>

}


export default Navbar