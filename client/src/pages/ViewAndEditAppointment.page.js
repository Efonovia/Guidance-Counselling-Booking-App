import React from 'react';
import { httpEditAppointment, httpGetAllCounselors, httpGetAppointment } from '../requests.hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { formatDate, formatTime, getStatus, getStatusColor, centerStyle, checkFormFields, getDateAndTimeObject, dateTimeStringToDate } from '../utils';
import { useSelector } from 'react-redux';
import ComboBox from '../components/mui/Autocomplete.components';


function ViewAndEditAppointment() {
    const userInfo = useSelector(state => state.user)
    const [appointmentInfo, setAppointmentInfo] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const appointmentId = useParams().id

    const navigate = useNavigate()

    const [listOfCounselors, setListOfCounselors] = React.useState([])
    const [formDetails, setFormDetails] = React.useState({
        studentSchoolId: "",
        counselor: "",
        note: "",
        appointmentDate: "",
        appointmentTime: "",
    })

    async function markAsComplete() {
        try {
            const updates = [{field: "completed", value: appointmentInfo?.completed ? "false":"true"}]
            const response = await httpEditAppointment({appointmentId, updates})
            if(response.ok) {
                alert("appointment edited successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(event) {
        const { value, name } = event.target;
        
        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name]: value,
        }))

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
            const emptyFields = checkFormFields(formDetails);
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }
            
            setLoading(true)
            let updates = []
            if(!appointmentInfo?.approved) {
                updates.push({ field: "approved", value: true })
            }
            for (const field in formDetails) {
                if(!["counselor", "appointmentDate", "appointmentTime"].includes(field) && formDetails[field] !== appointmentInfo[field]) {
                    updates.push({field, value: formDetails[field]})
                }
            }
            if(userInfo.type === "admin" && formDetails.counselor.id !== appointmentInfo?.counselorId) {
                updates.push({field: "counselorId", value: formDetails.counselor.id})
            } 
            if(new Date(dateTimeStringToDate(formDetails.appointmentDate, formDetails.appointmentTime)).getTime() !== new Date(appointmentInfo?.appointmentDate).getTime()) {
                updates.push({field: "appointmentDate", value: dateTimeStringToDate(formDetails.appointmentDate, formDetails.appointmentTime)})
            } 
    
            console.log(updates)
            const response = await httpEditAppointment({appointmentId, updates})
            console.log(response)
            if(response?.ok) {
                alert("Appointment edited successfully")
            }

            console.log(response)
        } catch (error) {
            console.log('Failed to create:', error);
        } finally {
            setLoading(false)
            setFormDetails({
                studentSchoolId: "",
                counselorId: "",
                note: "",
                appointmentDate: "",
                appointmentTime: "",
            })
            navigate(`${userInfo.type === "counselor" ? "/counselor/appointments":"/admin/viewallappointments"}`)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpGetAppointment(appointmentId)
                if(result?.ok) {
                    setAppointmentInfo(result.body)
                }

                if(userInfo.type === "admin") {
                    const result2 = await httpGetAllCounselors()
                    const counselorsList = result2.map(counselor => {
                        return {
                            id: counselor._id,
                            label: counselor.firstName + " " + counselor.lastName,
                            pic: `http://localhost:8000/uploads/${counselor.picturePath}`
                        }
                    })
                    setListOfCounselors(counselorsList)
                }
                
            } catch (error) {
                console.error('Error fetching appointment:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [appointmentId, userInfo.type])

    React.useEffect(() => {
        if (appointmentInfo) {
            const { appointmentDate, appointmentTime } = getDateAndTimeObject(appointmentInfo?.appointmentDate);
            setFormDetails({
                studentSchoolId: appointmentInfo?.studentSchoolId,
                counselor: { id: appointmentInfo?.counselorId, label: appointmentInfo?.counselorName, pic: `http://localhost:8000/uploads/${appointmentInfo?.counselorPic}` },
                note: appointmentInfo?.note,
                appointmentDate,
                appointmentTime,
            });
        }
    }, [appointmentInfo]);

    return loading ? <CircularProgress size={100} sx={{color: "black", margin: "150px 300px"}}/> : <div className="messages_box_area">
                <div className="messages_list">
                <div style={{height: "77vh", overflowY: "auto", alignItems: "start", gap: "10px"}} className="white_box cen-col">
                    <h2 style={{color: "black", marginTop: "20px", fontSize: "22px", textDecoration: "underline"}}>Appointment Details</h2>
                    <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Student ID:&nbsp;<span>{appointmentInfo?.studentSchoolId}</span></h3>
                    <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Counselor:&nbsp;<span>{appointmentInfo?.counselorName}</span></h3>
                    <h3 style={{paddingTop: "15px", fontSize: "20px", ...centerStyle}}>Status:&nbsp;&nbsp;<span style={{...getStatusColor(getStatus(appointmentInfo)), ...centerStyle, fontSize: "12px", borderRadius: "5px", padding: "5px 10px"}}>{getStatus(appointmentInfo)}</span></h3>
                    <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Appointment Date/Time:&nbsp;<span>{formatDate(appointmentInfo?.appointmentDate)} by {formatTime(appointmentInfo?.appointmentDate)}</span></h3>
                    <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Is a Referral?:&nbsp;<span>{appointmentInfo?.isReferral ? "Yes" : "No"}</span></h3>
                    <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Note:&nbsp;<span>{appointmentInfo?.note}</span></h3>
                    {appointmentInfo?.isReferral && <><h3 style={{paddingTop: "15px", fontSize: "20px"}}>Referrer Name:&nbsp;<span>{appointmentInfo?.referralInfo.name}</span></h3>
                    <h3 style={{paddingTop: "15px", fontSize: "20px"}}>Referrer Email:&nbsp;<span>{appointmentInfo?.referralInfo.email}</span></h3></>}
                </div>
                <div onClick={markAsComplete} style={{background: appointmentInfo?.completed ? "blue":"green", color: "white", ...centerStyle, padding: "5px 0", cursor: "pointer", borderRadius: "5px"}}>{appointmentInfo?.completed ? "Mark as Uncompleted" : "Mark as Completed"}</div>
                </div>
                <div className="messages_chat mb_30">
                    <div style={{height: "77vh", overflowY: "auto"}} className="white_box ">
                    <div className="modal-content cs_modal">
                            <div className="modal-header theme_bg_1 justify-content-center">
                                <h5 className="modal-title text_white">Edit Appointment</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <input name="studentSchoolId" value={formDetails.studentSchoolId} onChange={handleChange} type="text" className="form-control" placeholder="Student's School ID" />
                                    </div>
                                    {userInfo.type === "admin" && <ComboBox
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
                                    <a onClick={submitForm} style={{cursor: "pointer"}} href className="btn_1 full_width text-center">Approve & Edit</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}



export default ViewAndEditAppointment