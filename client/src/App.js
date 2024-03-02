import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.components';
import CounselorLogin from './pages/CounselorLogin.page';
import CreateAppointment from './pages/CreateAppointment.page';
import CreateCounselor from './pages/CreateCounselor.page';
import MessagesPage from './pages/MessagesPage.page';
import ViewAllCounselors from './pages/ViewAllCounselors.page';
import MySchedule from './pages/MySchedule.page';
import ViewAppointments from './pages/ViewAppointments.page';
import ViewAndEditAppointment from './pages/ViewAndEditAppointment.page';
import StudentAppointmentOverview from './pages/StudentAppointmentOverview.page';
import StudentBookAppointment from './pages/StudentBookAppointment.page';
import Home from './pages/Home.page';
import StudentLogin from './pages/StudentLogin.page';
import StudentSignUp from './pages/StudentSignUp.page';


function App() {
  return <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/counselor/login" element={<CounselorLogin />} />
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/signup" element={<StudentSignUp />} />
              <Route
                element={
                  <Navbar>
                    <Routes>
                      <Route path="/student/:id/bookappointment" element={<StudentBookAppointment />} />
                      <Route path="/student/:id/appointmentoverview" element={<StudentAppointmentOverview />} />
                      <Route path="/counselor/:id/createappointment" element={<CreateAppointment />} />
                      <Route path="/counselor/:id/schedule" element={<MySchedule />} />
                      <Route path="/counselor/:id/messages" element={<MessagesPage />} />
                      <Route path="/counselor/:id/appointments" element={<ViewAppointments />} />
                      <Route path="/counselor/:id/appointments/edit" element={<ViewAndEditAppointment />} />
                      <Route path="/admin/:id/viewcounselors" element={<ViewAllCounselors />} />
                      <Route path="/admin/:id/messages" element={<ViewAllCounselors />} />
                      <Route path="/admin/:id/createcounselor" element={<CreateCounselor />} />
                    </Routes>
                  </Navbar>
                }
              />
            </Routes>
          </BrowserRouter>
}


export default App