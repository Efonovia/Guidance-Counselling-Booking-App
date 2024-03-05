import React from 'react';
import CustomCarousel from '../components/CustomCarousel.components';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { checkFormFields, dateTimeStringToDate, formDataToJson } from '../utils';
import { httpBookAppointment, httpGetCurrentAppointment } from '../requests.hooks';
import { useNavigate } from 'react-router-dom';

function StudentBookAppointment() {
    const navigate = useNavigate()
    const appointmentFormRef = React.useRef(null)
    const userInfo = useSelector(state => state.user)
    const [loading, setLoading] = React.useState(false)
    const [appointmentDetails, setAppointmentDetails] = React.useState(null)
    const [formDetails, setFormDetails] = React.useState({
        counselorId: "",
        note: "",
        appointmentDate: "",
        appointmentTime: "",
    })

    function scrollToAppointmentForm() {
        appointmentFormRef.current.scrollIntoView({ behaviour: "smooth" })
    }

    function setCounselor(id) {
        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            counselorId: id,
        }))
        console.log(formDetails)
    }

    function handleChange(event) {
        const { value, name } = event.target;
        
        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name]: value,
        }))

        console.log(formDetails)
    }

    async function submitForm() {
        try {
            const formData = new FormData();
            formData.append('studentSchoolId', userInfo.schoolId);
            formData.append('counselorId', formDetails.counselorId);
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
                counselorId: "",
                note: "",
                appointmentDate: "",
                appointmentTime: "",
            })
            navigate("/student/appointmentoverview")
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpGetCurrentAppointment(userInfo.schoolId);
                setAppointmentDetails(result);

            } catch (error) {
                console.error('Error fetching appointment:', error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
        
    }, [userInfo.schoolId])


    return loading ? <CircularProgress size={100} sx={{color: "black", margin: "140px 300px"}}/> : (!Boolean(appointmentDetails) ? <div style={{gap: "150px"}} className='cen-col'>
        <CustomCarousel setCounselor={setCounselor} scrollToAppointmentForm={scrollToAppointmentForm} />
        <div ref={appointmentFormRef} className="modal-content cs_modal">
            <div style={{background: "black"}} className="modal-header justify-content-center">
                <h5 className="modal-title text_white">Fill in the Details of the Appointment</h5>
            </div>
            <div className="modal-body">
                <form>
                    <div>
                        <input name="appointmentDate" value={formDetails.appointmentDate} onChange={handleChange} type="date" className="form-control" placeholder="Date of Appointment" />
                    </div>
                    <div>
                        <input name="appointmentTime" value={formDetails.appointmentTime} onChange={handleChange} type="time" className="form-control" placeholder="Time of Appointment" />
                    </div>
                    <div>
                        <textarea name="note" value={formDetails.note} onChange={handleChange} placeholder='Note' cols={30} rows={1} style={{resize: "none", lineHeight: "25px", height: "70px"}}></textarea>
                    </div>
                    <a onClick={submitForm} style={{cursor: "pointer", background: "black"}} href className="btn_1 full_width text-center">Create</a>
                </form>
            </div>
        </div>
    </div> : <h3 style={{textAlign: "center", color: "black"}}>You already have an active appointment. Wait for it to be completed before you book another one</h3>)
}


export default StudentBookAppointment