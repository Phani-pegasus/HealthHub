import React, {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import './HospitalRegister.css'
const HospitalRegister = () =>{
    const navigate=useNavigate();
    const [Docname,setDocname]=useState('');
    const [Email,setEmail]=useState('');
    const [Hosname,setHosname]=useState('');
    const [Hosadd,setHosadd]=useState('');
    const [Hoscity,setHoscity]=useState('');
    const [Password,setPassword]=useState('');
    const [Confirmpassword,setConfirmpassword]=useState('');
    const [Mobile,setMobile]=useState('');

    const handlename = (e) => {
        setDocname(e.target.value);
    }
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }
    const handleConfirmpassword = (e) =>{
        setConfirmpassword(e.target.value);
    }
    const handleHosname = (e) =>{
        setHosname(e.target.value);
    }
    const handleHosadd = (e) =>{
        setHosadd(e.target.value);
    }
    const handlecity = (e) =>{
        setHoscity(e.target.value);
    }
    const handleMobile = (e) =>{
        setMobile(e.target.value);
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation logic
        if (!Docname || !Email || !Hosname || !Hosadd || !Hoscity || !Password || !Confirmpassword || !Mobile ) {
            alert('All fields are required');
            return;
        }
    
        // Validate email format
        const emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.com$/;
        if (!emailPattern.test(Email)) {
            alert('Please enter a valid email address in the format alphabets@alphabets.com');
            return;
        }
    
        if (Password !== Confirmpassword) {
            alert('Password and Confirm Password do not match');
            return;
        }
    
        // Make a POST request to the server
        try {
            const response = await fetch('http://localhost:3001/Hospital', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Docname,
                    Email,
                    Hosname,
                    Hosadd,
                    Hoscity,
                    Password,
                    Confirmpassword,
                    Mobile,
               
                }),
            });
    
            if (response.ok) {
                // Successful registration, navigate to login page or perform other actions
                alert('Hospital Registration successfully');
                navigate('/hospitallogin');
            } else {
                // Handle error responses from the server
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again later.');
        }
    };
    return (
        <div>
            <h1>Hospital Registration</h1>
            <div className="HospitalRegister">
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                <h3><label>Hospital Head Name</label>
                <input onChange={handlename} value={Docname} type="text" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Email</label>
                <input onChange={handleEmail} value={Email} type="email" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Passowrd</label>
                <input onChange={handlePassword} value={Password} type="password" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Confirm Password</label>
                <input onChange={handleConfirmpassword} value={Confirmpassword} type="password" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Hospital Name</label>
                <input onChange={handleHosname} value={Hosname} type="text" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Hospital Address</label>
                <input onChange={handleHosadd} value={Hosadd} type="text" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Hospital City</label>
                <input onChange={handlecity} value={Hoscity} type="text" /></h3>
                </div>
                <div className="form-group">
                <h3><label>Mobile</label>
                <input onChange={handleMobile} value={Mobile} type="number" /></h3>
                </div>
                <button>Submit</button>
            </form>
            </div>
            <h3 className="texting">
                Already Have Account ? <Link to='/hospitallogin'>Login Here</Link>
            </h3>
        </div>
    )


}
export default HospitalRegister;