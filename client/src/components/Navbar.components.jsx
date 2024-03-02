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


function Navbar({ children }) {
    const [showSideBar, setShowSideBar] = React.useState(false)

    return <> 
                <nav className={`sidebar vertical-scroll ps-container ps-theme-default ps-active-y${showSideBar ? " active_sidebar": ""}`}>
                    <div className="logo d-flex justify-content-between">
                        <a href><img src={logo} alt="alt" /></a>
                        <div onClick={() => setShowSideBar(false)} className="sidebar_close_icon d-lg-none">
                            <CloseIcon/>
                        </div>
                    </div>
                    {/* super admin menu */}
                    {/* <ul id="sidebar_menu">
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <PeopleIcon />
                                </div>
                                <span>All Counsellors</span>
                            </a>
                        </li>
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <AddIcon />
                                </div>
                                <span>Create Appointment</span>
                            </a>
                        </li>
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <PersonAddAltIcon />
                                </div>
                                <span>Add New Counsellor</span>
                            </a>
                        </li>
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <MessageIcon />
                                </div>
                                <span>Messages</span>
                            </a>
                        </li>
                    </ul> */}

                    {/* Counselor menu */}
                    {/* <ul id="sidebar_menu">
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <CalendarMonthIcon />
                                </div>
                                <span>My Schedule</span>
                            </a>
                        </li>
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <AddIcon />
                                </div>
                                <span>Create Appointment</span>
                            </a>
                        </li>
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <MessageIcon />
                                </div>
                                <span>Messages</span>
                            </a>
                        </li>
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <HowToRegIcon />
                                </div>
                                <span>Appointments</span>
                            </a>
                        </li>
                    </ul> */}

                    {/* Student menu */}
                    <ul id="sidebar_menu">
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <CalendarMonthIcon />
                                </div>
                                <span>My Appointment</span>
                            </a>
                        </li>
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <AddIcon />
                                </div>
                                <span>Book Appointment</span>
                            </a>
                        </li>
                        <li style={{ cursor: "pointer" }}>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <MessageIcon />
                                </div>
                                <span>Chat with Counselor</span>
                            </a>
                        </li>
                    </ul>

                </nav>
                <PostNavbar openSideBar={() => setShowSideBar(true)}>{children}</PostNavbar>
            </>

}


export default Navbar