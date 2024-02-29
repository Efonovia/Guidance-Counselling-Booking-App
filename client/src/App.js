import Navbar from './components/Navbar.components';
import CounselorLogin from './pages/CounselorLogin.page';
import CreateAppointment from './pages/CreateAppointment.page';
import CreateCounselor from './pages/CreateCounselor.page';
import MessagesPage from './pages/MessagesPage.page';
import ViewAllCounselors from './pages/ViewAllCounselors.page';
import MySchedule from './pages/MySchedule.page';
import ViewAppointments from './pages/ViewAppointments.page';


function App() {
  return <>
    <Navbar>
      <ViewAppointments />
    </Navbar>
      {/* <MySchedule /> */}
      {/* <MessagesPage /> */}
      {/* <CreateAppointment /> */}
      {/* <ViewAllCounselors /> */}
      {/* <CreateCounselor /> */}
  {/* <CounselorLogin /> */}
  </>
}

export default App;
