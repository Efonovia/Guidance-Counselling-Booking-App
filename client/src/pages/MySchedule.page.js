import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import "../styles/calendar.css"
import { useSelector } from 'react-redux';
import React from 'react';
import { httpGetAllAppointments, httpGetStudent } from '../requests.hooks';
import { formatDate, formatTime, getStatus } from '../utils';
import { CircularProgress } from '@mui/material';



function MySchedules() {
  const userInfo = useSelector(state => state.user)
  const [loading, setLoading] = React.useState(true)
  const [currentAppointments, setCurrentAppointments] = React.useState([])

  function getTodoList(date) {
    const day = formatDate(date);

    let finalList = []
    currentAppointments?.forEach(appointment => {
      const appointmentDay = formatDate(appointment.appointmentDate)
      if(appointmentDay === day) {
        finalList.push(
          {
            time: formatTime(appointment.appointmentDate), 
            title: `Appointment with ${appointment.studentName === "none available" ? " a student(manual)" : appointment.studentName}` 
          }
        )
      }
    })

    return finalList
  
    // switch (day) {
    //   case 10:
    //     return [
    //       { time: '10:30 am', title: 'Meeting' },
    //       { time: '12:00 pm', title: 'Lunch' }
    //     ];
    //   case 15:
    //     return [
    //       { time: '09:30 pm', title: 'Products Introduction Meeting' },
    //       { time: '12:30 pm', title: 'Client entertaining' },
    //       { time: '02:00 pm', title: 'Product design discussion' },
    //       { time: '05:00 pm', title: 'Product test and acceptance' },
    //       { time: '06:30 pm', title: 'Reporting' },
    //       { time: '10:00 pm', title: 'Going home to walk the dog' }
    //     ];
    //   default:
    //     return [];
    // }
  }

  function renderCell(date) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a href>{moreCount > 2 ? `${moreCount} more` : "view"}</a>
          </Whisper>
        </li>
      )

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
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
            const filteredApointments = formattedResponses.filter(appointment => getStatus(appointment) === "active")
            console.log(filteredApointments)
            setCurrentAppointments(filteredApointments)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    fetchData();
    
}, [userInfo._id])

  return loading ? <CircularProgress size={100} sx={{color:'black', marginTop: "150px", marginLeft: "500px"}}/> : <Calendar bordered renderCell={renderCell} />
};


export default MySchedules