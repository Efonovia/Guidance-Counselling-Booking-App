import React from 'react';
import ComboBox from '../components/mui/Autocomplete.components';
import pfpPic from "../assets/img/messages/1.png"

const testLabels = [
    {
        label: "radiohead1",
        pic: pfpPic
    },
    {
        label: "radiohead2",
        pic: pfpPic
    },
    {
        label: "radiohead3",
        pic: pfpPic
    },
    {
        label: "radiohead4",
        pic: pfpPic
    },
    {
        label: "radiohead5",
        pic: pfpPic
    },
    {
        label: "radiohead6",
        pic: pfpPic
    },
    {
        label: "radiohead7",
        pic: pfpPic
    },
]

function CreateAppointment() {


    return <div className="white_box mb_30">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="modal-content cs_modal">
                            <div className="modal-header theme_bg_1 justify-content-center">
                                <h5 className="modal-title text_white">Create a New Appointment</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <input type="text" className="form-control" placeholder="Student's School ID" />
                                    </div>
                                    <ComboBox 
                                        options={testLabels} 
                                        label="Select Counselor"
                                        // value={searchState}
                                        // onStateChange={onSearchStateChange}
                                    />
                                    <div>
                                        <input type="date" className="form-control" placeholder="Date of Appointment" />
                                    </div>
                                    <div>
                                        <input type="time" className="form-control" placeholder="Time of Appointment" />
                                    </div>
                                    <div>
                                        <textarea placeholder='Notes' cols={30} rows={1} style={{resize: "none", lineHeight: "25px", height: "70px"}}></textarea>
                                    </div>
                                    <a style={{cursor: "pointer"}} href className="btn_1 full_width text-center">Create</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default CreateAppointment