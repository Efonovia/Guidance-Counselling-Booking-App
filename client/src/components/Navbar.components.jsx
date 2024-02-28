import React from 'react';
import logo from "../assets/img/logo.png"
import PostNavbar from './PostNavbar.components';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function Navbar({ children }) {


    return <> 
                <nav className="sidebar vertical-scroll ps-container ps-theme-default ps-active-y">
                    <div className="logo d-flex justify-content-between">
                        <a href="index-2.html"><img src={logo} alt="alt" /></a>
                        <div className="sidebar_close_icon d-lg-none">
                            <i className="ti-close"></i>
                        </div>
                    </div>
                    <ul id="sidebar_menu">
                        <li>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <PeopleIcon />
                                </div>
                                <span>All Counsellors</span>
                            </a>
                        </li>
                        <li>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <AddIcon />
                                </div>
                                <span>Create Appointment</span>
                            </a>
                        </li>
                        <li>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <PersonAddAltIcon />
                                </div>
                                <span>Add Counsellor</span>
                            </a>
                        </li>
                        <li>
                            <a className="has-arrow" href aria-expanded="false">
                                <div className="icon_menu">
                                    <CalendarMonthIcon />
                                </div>
                                <span>Schedules***</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <PostNavbar>{children}</PostNavbar>
            </>

}


export default Navbar