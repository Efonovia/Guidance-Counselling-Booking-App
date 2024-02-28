import Navbar from './components/Navbar.components';
import CounselorLogin from './pages/CounselorLogin.page';
import CreateCounselor from './pages/CreateCounselor.page';


function App() {
  return <>
    <Navbar>
      <CreateCounselor />
    </Navbar>
  {/* <CounselorLogin /> */}
  </>
}

export default App;
