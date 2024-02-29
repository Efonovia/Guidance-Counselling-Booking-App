import React from 'react';
import SearchIcon from '@mui/icons-material/Search';


function ViewAllCounselors() {


    return <div className="messages_box_area">
    <div className="messages_list">
        <div className="white_box ">
            <div className="white_box_tittle list_header">
                <h4>Chat List</h4>
            </div>
            <div className="serach_field_2">
                <div className="search_inner">
                    <form active="#">
                        <button type="submit"><SearchIcon /></button>
                        <div className="search_field">
                            <input type="text" placeholder="Search content here..."/>
                        </div>
                    </form>
                </div>
            </div>
            <ul style={{height: "50vh", overflowY: "auto"}}>
               
                <li>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src="img/messages/1.png" alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>Travor James</h4>
                                <p>i know you are doing great</p>
                            </div>
                        </div>
                        <div className="messge_time">
                            <span>28th Nov</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src="img/messages/1.png" alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>Travor James</h4>
                                <p>i know you are doing great</p>
                            </div>
                        </div>
                        <div className="messge_time">
                            <span>28th Nov</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src="img/messages/1.png" alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>Travor James</h4>
                                <p>i know you are doing great</p>
                            </div>
                        </div>
                        <div className="messge_time">
                            <span>28th Nov</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src="img/messages/1.png" alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>Travor James</h4>
                                <p>i know you are doing great</p>
                            </div>
                        </div>
                        <div className="messge_time">
                            <span>28th Nov</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src="img/messages/1.png" alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>Travor James</h4>
                                <p>i know you are doing great</p>
                            </div>
                        </div>
                        <div className="messge_time">
                            <span>28th Nov</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src="img/messages/1.png" alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>Travor James</h4>
                                <p>i know you are doing great</p>
                            </div>
                        </div>
                        <div className="messge_time">
                            <span>28th Nov</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href>
                        <div className="message_pre_left">
                            <div className="message_preview_thumb">
                                <img src="img/messages/1.png" alt=""/>
                            </div>
                            <div className="messges_info">
                                <h4>Travor James</h4>
                                <p>i know you are doing great</p>
                            </div>
                        </div>
                        <div className="messge_time">
                            <span>28th Nov</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div className="messages_chat mb_30">
        <div style={{height: "75vh", overflowY: "auto"}} className="white_box ">
        <h2>Efosa's appointments schedule</h2>
        <div class="table-responsive">
            <table class="table">
                <thead class="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student</th>
                        <th scope="col">Date/time</th>
                        <th scope="col">Completed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td><span style={{display: "block", background: "red", width: "20px", height: "20px", borderRadius: "100%"}}></span></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
</div>
}


export default ViewAllCounselors