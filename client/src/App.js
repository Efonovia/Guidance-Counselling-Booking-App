import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.components';
import CounselorLogin from './pages/CounselorLogin.page';
import CreateAppointment from './pages/CreateAppointment.page';
import CreateCounselor from './pages/CreateCounselor.page';
import MessagesPage from './pages/MessagesPage.page';
import MySchedule from './pages/MySchedule.page';
import ViewAppointments from './pages/ViewAppointments.page';
import ViewAndEditAppointment from './pages/ViewAndEditAppointment.page';
import StudentAppointmentOverview from './pages/StudentAppointmentOverview.page';
import StudentBookAppointment from './pages/StudentBookAppointment.page';
import Home from './pages/Home.page';
import StudentLogin from './pages/StudentLogin.page';
import StudentSignUp from './pages/StudentSignUp.page';
import ViewAllAppointments from './pages/ViewAllAppointments.page';
import ViewAllCounselors from './pages/ViewAllCounselors.page';
import ReferralAppointment from './pages/ReferralAppointment.page';
import ProtectedRoute from './components/auth/ProtectedRoute';


function App() {
  return <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/counselor/login" element={<CounselorLogin />} />
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/signup" element={<StudentSignUp />} />
              <Route path="/referral" element={<ReferralAppointment />} />

              <Route element={<ProtectedRoute role="student" />}>
                  <Route path="/student/bookappointment" element={<Navbar><StudentBookAppointment /></Navbar>} />
                  <Route path="/student/appointmentoverview" element={<Navbar><StudentAppointmentOverview /></Navbar>} />
              </Route>

              <Route element={<ProtectedRoute role="counselor" />}>
                  <Route path="/counselor/createappointment" element={<Navbar><CreateAppointment /></Navbar>} />
                  <Route path="/counselor/schedule" element={<Navbar><MySchedule /></Navbar>} />
                  <Route path="/counselor/messages" element={<Navbar><MessagesPage /></Navbar>} />
                  <Route path="/counselor/appointments" element={<Navbar><ViewAppointments /></Navbar>} />
                  <Route path="/counselor/appointments/:id/edit" element={<Navbar><ViewAndEditAppointment /></Navbar>} />
              </Route>

              <Route element={<ProtectedRoute role="admin" />}>
                  <Route path="/admin/schedule" element={<Navbar><MySchedule /></Navbar>} />
                  <Route path="/admin/viewallappointments" element={<Navbar><ViewAllAppointments /></Navbar>} />
                  <Route path="/admin/viewallcounselors" element={<Navbar><ViewAllCounselors /></Navbar>} />
                  <Route path="/admin/appointments/:id/edit" element={<Navbar><ViewAndEditAppointment /></Navbar>} />
                  <Route path="/admin/messages" element={<Navbar><MessagesPage /></Navbar>} />
                  <Route path="/admin/createcounselor" element={<Navbar><CreateCounselor /></Navbar>} />
                  <Route path="/admin/createappointment" element={<Navbar><CreateAppointment /></Navbar>} />
              </Route>
            </Routes>
          </BrowserRouter>
}


export default App