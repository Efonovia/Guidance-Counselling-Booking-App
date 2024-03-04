import React from 'react';
import { CircularProgress } from '@mui/material';
import { httpEditAppointment, httpGetAllAppointments, httpGetAllCounselors, httpGetStudent } from '../requests.hooks';
import { formatDate, formatTime, getStatus, getStatusColor, centerStyle } from '../utils';
import { useNavigate } from 'react-router-dom';


function ViewAllAppointments() {
    const [listOfCounselors, setListOfCounselors] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [selectedCounselor, setSelectedCounselor] = React.useState(null)
    const [currentAppointments, setCurrentAppointments] = React.useState([])
    const [currentAppointmentsLoading, setCurrentAppointmentsLoading] = React.useState(true)

    const navigate = useNavigate()
    
    async function cancelAppointment(appointmentId) {
        try {
            const updates = [{field: "cancelled", value: "true"}]
            const response = await httpEditAppointment({appointmentId, updates})
            if(response.ok) {
                alert("appointment deleted successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function viewCounselorAppointments(counselorId, name) {
        setSelectedCounselor({counselorId, name})
        try {
            const response = await httpGetAllAppointments(counselorId)
            const formattedResponses = await Promise.all(
                response.body.map(async appointment => {
                    if(appointment.studentId) {
                        const studentInfo = await httpGetStudent(appointment.studentId)
                        return {
                            ...appointment,
                            studentSchoolId: studentInfo.schoolId,
                            studentName: studentInfo.firstName + " " + studentInfo.lastName,
                        }
                    } else {
                        return {
                            ...appointment,
                            studentName: "none available",
                        }
                    }
                })
            )
            setCurrentAppointments(formattedResponses)
        } catch (error) {
            console.log(error)
        } finally {
            setCurrentAppointmentsLoading(false)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpGetAllCounselors();
                setListOfCounselors(result);
            } catch (error) {
                console.error('Error fetching appointment:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [])

    const listOfCounselorsHTML = listOfCounselors.map(counselor => {
        return <li onClick={() => viewCounselorAppointments(counselor._id, counselor.firstName)} style={{cursor: "pointer"}} key={counselor._id}>
                <a href>
                    <div className="message_pre_left">
                        <div className="message_preview_thumb">
                            <img src={`http://localhost:8000/counselors/pic/${counselor.picturePath}`} alt=""/>
                        </div>
                        <div className="messges_info">
                            <h4>{counselor.firstName} {counselor.lastName}</h4>
                        </div>
                    </div>
                </a>
            </li>
    })

    const appointmentRowsHTML = currentAppointments.map(appointment => {
        const status = getStatus(appointment)
        return <tr key={appointment._id}>
                    <td>{appointment.studentName}</td>
                    <td>{formatDate(appointment.appointmentDate)} by {formatTime(appointment.appointmentDate)}</td>
                    <td>{appointment.isReferral ? "Yes" : "No"}</td>
                    <td><span style={{display: "block", ...getStatusColor(status), ...centerStyle, fontSize: "12px", borderRadius: "5px", padding: "5px 0px"}}>{status}</span></td>
                    <td><a onClick={() => navigate(`/admin/appointments/${appointment._id}/edit`)} href style={{background: "blue", cursor: "pointer", padding: "6px 0px", ...centerStyle}} className="status_btn">View & Edit</a></td>
                    <td><a onClick={() => cancelAppointment(appointment._id)} href style={{background: "red", cursor: "pointer", padding: "7px 0px", ...centerStyle}} className="status_btn">Cancel</a></td>
                </tr>
    })

    return loading ? <CircularProgress size={100} sx={{color:'black', margin: "150px 400px"}}/> : <div id='view_all_counselors' className="messages_box_area">
    <div className="messages_list">
        <div className="white_box ">
            <div className="white_box_tittle list_header">
                <h4 style={{textAlign: "center"}}>All Counselors</h4>
            </div>
            <ul style={{height: "50vh", overflowY: "auto"}}>{listOfCounselorsHTML}</ul>
        </div>
    </div>
    <div className="messages_chat mb_30">
        {!Boolean(selectedCounselor) ? <h1 style={{textAlign: "center"}}>Select a counselor to view their appointments</h1> : 
        ((Boolean(selectedCounselor) && currentAppointmentsLoading) ? <CircularProgress size={100} sx={{color:'black', marginTop: "150px", marginLeft: "200px"}}/> : <div style={{height: "80vh", overflowY: "auto"}} className="white_box ">
        <h2 style={{color: "black", textAlign: "center"}}>{selectedCounselor?.name}'s appointments</h2>
        <div className="table-responsive">
            {currentAppointments.length ? <table className="table">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Student</th>
                        <th scope="col">Date/time</th>
                        <th scope="col">Referral</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>{appointmentRowsHTML}</tbody>
            </table> : <h2 style={{textAlign: "center", color: "black", fontSize: "20px", margin: "auto"}}>No appointments currently</h2>}
        </div>
        </div>)}
    </div>
</div>
}


export default ViewAllAppointments