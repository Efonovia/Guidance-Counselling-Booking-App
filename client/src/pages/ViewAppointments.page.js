import { CircularProgress } from '@mui/material';
import React from 'react';
import { formatDate, formatTime, getStatus, getStatusColor, centerStyle, sortByStatus } from '../utils';
import { httpEditAppointment, httpGetAllAppointments, httpGetStudent } from '../requests.hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ViewAppointments() {
    const userInfo = useSelector(state => state.user)
    const [loading, setLoading] = React.useState(true)
    const [currentAppointments, setCurrentAppointments] = React.useState([])


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

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpGetAllAppointments(userInfo._id)
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
                setCurrentAppointments(sortByStatus(formattedResponses))
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [userInfo._id])

    const appointmentRowsHTML = currentAppointments.map(appointment => {
        const status = getStatus(appointment)
        return <tr key={appointment._id}>
                    <td>{appointment.studentName}</td>
                    <td>{formatDate(appointment.appointmentDate)} by {formatTime(appointment.appointmentDate)}</td>
                    <td>{appointment.isReferral ? "Yes" : "No"}</td>
                    <td><span style={{display: "block", ...getStatusColor(status), ...centerStyle, fontSize: "12px", borderRadius: "5px", padding: "5px 0px"}}>{status}</span></td>
                    <td><a onClick={() => navigate(`/counselor/appointments/${appointment._id}/edit`)} href style={{background: "blue", cursor: "pointer", padding: "6px 0px", ...centerStyle}} className="status_btn">View & Edit</a></td>
                    <td><a onClick={() => cancelAppointment(appointment._id)} href style={{background: "red", cursor: "pointer", padding: "7px 0px", ...centerStyle}} className="status_btn">Cancel</a></td>
                </tr>
    })

    return <div className="messages_chat mb_30">
    {loading ? <CircularProgress size={100} sx={{color:'black', marginTop: "150px", marginLeft: "200px"}}/> : <div style={{height: "80vh", overflowY: "auto"}} className="white_box ">
    <h2 style={{color: "black", textAlign: "center"}}>Your appointments</h2>
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
    </div>}
</div>
}


export default ViewAppointments