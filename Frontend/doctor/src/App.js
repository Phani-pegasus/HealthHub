import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import HospitalRegister from './components/HospitalRegister';
import HospitalLogin from './components/HospitalLogin';
import Userforgot from './components/Userforgot';
import UserReset from './components/UserReset';
import Hospitalforgot from './components/Hospitalforgot';
import HospitalReset from './components/HospitalReset';
import UserDisplay from './components/UserDisplay';
import HospitalDisplay from './components/HospitalDisplay';
function App() {
  return (
    <Router>
    <div className="App">
      
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/userregister' element={<UserRegister />}></Route>
          <Route path='/userlogin' element={<UserLogin />}></Route>
          <Route path='/hospitalregister' element={<HospitalRegister />}></Route>
          <Route path='/hospitallogin' element={<HospitalLogin />}></Route>
          <Route path='/userforgot' element={<Userforgot />}></Route>
          <Route path='/userresetpassword' element={<UserReset />}></Route>
          <Route path='/hospitalforgot' element={<Hospitalforgot />}></Route>
          <Route path='/hospitalreset' element={<HospitalReset />}></Route>
          <Route path='/userdisplay' element={<UserDisplay />}></Route>
          <Route path='/hospitaldisplay' element={<HospitalDisplay />}></Route>
        </Routes>
   
    </div>
    </Router>
  );
}

export default App;
