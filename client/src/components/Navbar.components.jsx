import React from 'react';
import logo from "../assets/img/logo.png"
import PostNavbar from './PostNavbar.components';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';


function Navbar({ children }) {


    return <> 
                <nav className="sidebar vertical-scroll ps-container ps-theme-default ps-active-y">
                    <div className="logo d-flex justify-content-between">
                        <a href="index-2.html"><img src={logo} alt="alt" /></a>
                        <div className="sidebar_close_icon d-lg-none">
                            <i className="ti-close"></i>
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
                    </ul> */}

                    <ul id="sidebar_menu">
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
                                <span>My Appointments</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <PostNavbar>{children}</PostNavbar>
            </>

}


export default Navbar