import React from "react";
import {useNavigate} from "react-router-dom";
import './Home.css';
const Home = () => {
    const navigate=useNavigate();
    const userRegister=()=>{
        navigate('/userregister');
    }
    const userLogin = () =>{
        navigate('/userlogin');
    }
    const hospitalRegister = () =>{
        navigate('/hospitalregister');
    }
    const hospitalLogin = () =>{
        navigate('/hospitallogin');
    }
    return(
        <div>
            <h1>Emergency Hospitalization is indeed a need</h1>
            <div className="container">
            <div className="boxing">
                <h3>For User Register and Login Click Here</h3>
                <button onClick={userRegister}>Register</button>
                <br></br>
                <button onClick={userLogin}>Login</button>
            </div>
            <div className="boxlogin">
                <h3>For Hospital Register and Login click Here</h3>
                <button onClick={hospitalRegister}>Register</button>
                <br></br>
                <button onClick={hospitalLogin}>Login</button>
            </div>
            </div>
        </div>
    );
}

export default Home;