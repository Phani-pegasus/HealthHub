import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import './HospitalReset.css';
const HospitalReset =() =>{
    const navigate=useNavigate();
    const [Password,setPassword]=useState('');
    const [Confirmpassword,setConfirmpassword]=useState('');
    const [otp,setOtp]=useState('');
    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }
    const handleConfirmpassword = (e) =>{
        setConfirmpassword(e.target.value);
    }
    const handleOtp = (e) =>{
      setOtp(e.target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Validate if the fields are not empty
    if (!otp || !Password || !Confirmpassword) {
      alert('All fields are required');
      return;
    }

    // Validate if Password and Confirm Password match
    if (Password !== Confirmpassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    try {
      // Send a POST request to the server with OTP, Password, and Confirm Password
      const response = await fetch('http://localhost:3001/hospitalreset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp,
          Password,
          Confirmpassword,
        }),
      });

      // Check if the response is OK (status code 200-299)
      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();

        // Check if the response contains a success message
        if (data.message === "Success") {
          // If success, show alert and navigate to login page
          alert("Password updated successfully");
          navigate('/hospitallogin'); // Adjust the path to your home page
        } else {
          // If the message is not as expected, show an alert with the message
          alert(data.message);
        }
      } else {
        // If the response status is not OK, show an alert with the error status
        alert(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
    
    };
    
      
    
    return (
        <div>
            <h1>Updating Password</h1>
            <div className="hospitalreset">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <h3><label> Enter OTP</label>
                <input onChange={handleOtp} value={otp} type="password" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Password</label>
                <input onChange={handlePassword} value={Password} type="password" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Confirm Password</label>
                <input onChange={handleConfirmpassword} value={Confirmpassword} type="password" /></h3>
                </div>
                <button>Update</button>
            </form>
            </div>
         

       
        </div>
    )
}
export default HospitalReset ;