import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import './HospitalLogin.css';
const HospitalLogin =() =>{
    const navigate=useNavigate();
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
            
    try {
        const response = await fetch('http://localhost:3001/Hospital');
        
        if (!response.ok) {
          alert('Can\'t Fetch Data');
          return;
        }
  
        const data = await response.json();
  
        const user = data.find((user) => user.Email === Email && user.Password === Password);
  
        if (user) {
          // Credentials are correct, navigate to home
          alert("Login Successful");
          navigate('/hospitaldisplay'); // Adjust the path to your home page
        } else {
          // Invalid credentials, show error message
          alert("Invalid Email and Password")
        }
      } catch (error) {
        // Handle any errors here
        alert("An Error Occurred");
      }
    }
    return (
        <div>
            <h1>Hospital Login</h1>
            <div className="hospitallogin">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <h3><label>Email</label>
                <input onChange={handleEmail} value={Email} type="email" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Password</label>
                <input onChange={handlePassword} value={Password} type="password" /></h3>
                </div>
                <button>Login</button>
            </form>
            </div>

            <h3 className="texting">
                New User! Create an Account Here <Link to='/hospitalregister'>Register</Link>
            </h3>
            <h3 className="texting">
                Forgot Password CLick Here <Link to='/hospitalforgot'>Forgot</Link>
            </h3>
        </div>
      
    )
}
export default HospitalLogin;