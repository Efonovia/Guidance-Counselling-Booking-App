import React from 'react';
import ComboBox from '../components/mui/Autocomplete.components';
import { CircularProgress } from '@mui/material';
import { httpBookAppointment, httpGetAllCounselors, httpGetCurrentAppointment } from '../requests.hooks';
import { checkFormFields, dateTimeStringToDate, formDataToJson } from '../utils';
import { useSelector } from 'react-redux';


function CreateAppointment() {
    const userInfo = useSelector(state => state.user)
    const [loading, setLoading] = React.useState(true)
    const [listOfCounselors, setListOfCounselors] = React.useState([])
    const [formDetails, setFormDetails] = React.useState({
        studentSchoolId: "",
        counselor: userInfo.type === "counselor" ? userInfo._id : "",
        note: "",
        appointmentDate: "",
        appointmentTime: "",
    })

    function handleChange(event) {
        const { value, name } = event.target;
        
        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name]: value,
        }))

        console.log(formDetails)
    }

    function handleCounselorsChange(value) {
        setFormDetails(prevFormDetails => (
            {
                ...prevFormDetails,
                counselor: value
            }
        ))
        console.log(value)
    }

    async function submitForm() {
        try {
            const formData = new FormData();
            formData.append('studentSchoolId', formDetails.studentSchoolId);
            if(userInfo.type === "admin") {
                formData.append('counselorId', formDetails.counselor.id);
            } else {
                formData.append('counselorId', formDetails.counselor);
                formData.append('approved', true);
            }
            formData.append('appointmentDate', dateTimeStringToDate(formDetails.appointmentDate, formDetails.appointmentTime));
            formData.append('note', formDetails.note)
            formData.append('isReferral', false);
            formData.append('referralInfo', null);
            console.log(formDataToJson(formData))
            console.log("before", formDetails)
            const emptyFields = checkFormFields(formDetails);
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }
            
            setLoading(true)
            const studentCurrentAppointment = await httpGetCurrentAppointment(formDetails.studentSchoolId)

            if(studentCurrentAppointment.body) {
                alert("student already has an appointment")
                return
            }
            const response = await httpBookAppointment(formDataToJson(formData))
            console.log(response)
            if(response?.ok) {
                alert("Appointment created successfully")
            }

            console.log(response)
        } catch (error) {
            console.log('Failed to create:', error);
        } finally {
            setLoading(false)
            setFormDetails({
                studentSchoolId: "",
                counselor:  userInfo.type === "counselor" ? userInfo._id : "",
                note: "",
                appointmentDate: "",
                appointmentTime: "",
            })
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpGetAllCounselors();
                const counselorsList = result.map(counselor => {
                    return {
                        id: counselor._id,
                        label: counselor.firstName + " " + counselor.lastName,
                        pic: `https://res.cloudinary.com/dn6uuvy0b/image/upload/v1725657663/${counselor.picturePath}`
                    }
                })
                setListOfCounselors(counselorsList);
            } catch (error) {
                console.error('Error fetching appointment:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [])

    return loading ? <CircularProgress size={100} sx={{color: "black", margin: "140px 300px"}}/> : <div className="white_box mb_30">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="modal-content cs_modal">
                            <div className="modal-header theme_bg_1 justify-content-center">
                                <h5 className="modal-title text_white">Create a New Appointment</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <input name="studentSchoolId" value={formDetails.studentSchoolId} onChange={handleChange} type="text" className="form-control" placeholder="Student's School ID" />
                                    </div>
                                    {userInfo.type ==="admin" && <ComboBox 
                                        options={listOfCounselors} 
                                        label="Select Counselor"
                                        value={formDetails.counselor}
                                        handleChange={handleCounselorsChange}
                                    />}
                                    <div>
                                        <input name="appointmentDate" value={formDetails.appointmentDate} onChange={handleChange} type="date" className="form-control" placeholder="Date of Appointment" />
                                    </div>
                                    <div>
                                        <input name="appointmentTime" value={formDetails.appointmentTime} onChange={handleChange} type="time" className="form-control" placeholder="Time of Appointment" />
                                    </div>
                                    <div>
                                        <textarea name="note" value={formDetails.note} onChange={handleChange} placeholder='Note' cols={30} rows={1} style={{resize: "none", lineHeight: "25px", height: "70px"}}></textarea>
                                    </div>
                                    <a onClick={submitForm} style={{cursor: "pointer"}} href className="btn_1 full_width text-center">Create</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default CreateAppointment