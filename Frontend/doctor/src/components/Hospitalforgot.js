import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import './HospitalForgot.css';
const Hospitalforgot =() =>{
    const navigate=useNavigate();
    const [Email,setEmail]=useState('');
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Fetch data from the server using POST method
          const response = await fetch('http://localhost:3001/hospitalforgot', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email }), // Send the email in the request body
          });
      
          // Check if the response is OK (status code 200-299)
          if (response.ok) {
            // Parse the JSON response
            const data = await response.json();
      
            // Check if the response contains a message
            if (data.message === "Successfully sent") {
              // If success, show alert and navigate to login page
              alert("Successfully sent");
              navigate('/hospitalreset'); // Adjust the path to your home page
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
            <h1>Hospital Forgot</h1>
            <div className="hospitalforgot">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <h3><label>Email</label>
                <input onChange={handleEmail} value={Email} type="email" /></h3>
                </div>
                <button>Forgot</button>
            </form>
            </div>
         

            <h3 className="texting">
                New User! Create an Account Here <Link to='/userregister'>Register</Link>
            </h3>

            <h3 className="texting">
              ALready Log in? <Link to ='/userlogin'>Login</Link>
            </h3>
        </div>
     
    )
}
export default Hospitalforgot;