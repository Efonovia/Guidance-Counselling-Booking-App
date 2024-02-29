import React from 'react';
import SearchIcon from '@mui/icons-material/Search';


function MessagesPage() {


    return <div className="messages_box_area">
    <div className="messages_list">
        <div className="white_box ">
            <div className="white_box_tittle list_header">
                <h4>Chat List</h4>
            </div>
            <div className="serach_field_2">
                <div className="search_inner">
                    <form>
                        <button type="submit"><SearchIcon /></button>
                        <div className="search_field">
                            <input type="text" placeholder="Search content here..."/>
                        </div>
                    </form>
                </div>
            </div>
            <ul style={{height: "52vh", overflowY: "auto"}}>
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
        <div style={{height: "65vh", overflowY: "auto"}} className="white_box ">
            <div className="single_message_chat">
                <div className="message_pre_left">
                    <div className="message_preview_thumb">
                        <img src="img/messages/1.png" alt=""/>
                    </div>
                    <div className="messges_info">
                        <h4>Travor James</h4>
                        <p>Yesterday at 6.33 pm</p>
                    </div>
                </div>
                <div className="message_content_view red_border">
                    <p>
                        how are you doing
                    </p>
                </div>
            </div>
            <div className="single_message_chat sender_message">
                <div className="message_pre_left">
                    <div className="messges_info">
                        <h4>Agatha Kristy</h4>
                        <p>Yesterday at 6.33 pm</p>
                    </div>
                    <div className="message_preview_thumb">
                        <img src="img/messages/1.png" alt=""/>
                    </div>
                </div>
                <div className="message_content_view">
                    <p>
                        how are you doing
                    </p>
                </div>
            </div>
            <div className="single_message_chat sender_message">
                <div className="message_pre_left">
                    <div className="messges_info">
                        <h4>Agatha Kristy</h4>
                        <p>Yesterday at 6.33 pm</p>
                    </div>
                    <div className="message_preview_thumb">
                        <img src="img/messages/1.png" alt=""/>
                    </div>
                </div>
                <div className="message_content_view">
                    <p>
                        how are you doing
                    </p>
                </div>
            </div>
            <div className="single_message_chat sender_message">
                <div className="message_pre_left">
                    <div className="messges_info">
                        <h4>Agatha Kristy</h4>
                        <p>Yesterday at 6.33 pm</p>
                    </div>
                    <div className="message_preview_thumb">
                        <img src="img/messages/1.png" alt=""/>
                    </div>
                </div>
                <div className="message_content_view">
                    <p>
                        how are you doing
                    </p>
                </div>
            </div>
        </div>
        <div style={{position: "sticky", marginTop: "-20px"}} className="message_send_field">
            <textarea rows={3} style={{resize: "none", borderRadius: "5px", padding: "5px"}} placeholder="Write your message"/>
            <button className="btn_1" type="submit">Send</button>
        </div>
    </div>
</div>
}


export default MessagesPage