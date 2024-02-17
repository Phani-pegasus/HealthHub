import React, {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import './UserRegister.css';
const UserRegister = () =>{
    const navigate=useNavigate();
    const [Name,setName]=useState('');
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const [Confirmpassword,setConfirmpassword]=useState('');
    const [Mobile,setMobile]=useState('');
   
    const handleName = (e) =>{
        setName(e.target.value);
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
    const handleMobile = (e) =>{
        setMobile(e.target.value);
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation logic
        if (!Name || !Email || !Password || !Confirmpassword || !Mobile ) {
            alert('All fields are required');
            return;
        }
    
        // Validate email format
        const emailPattern = /^[a-zA-Z0-9.]+@gmail+\.com$/;
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
            const response = await fetch('http://localhost:3001/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name,
                    Email,
                    Password,
                    Confirmpassword,
                    Mobile,
                
                }),
            });
    
            if (response.ok) {
                // Successful registration, navigate to login page or perform other actions
                alert('User registered successfully');
                navigate('/userlogin');
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
            <h1>User Registration</h1>
           
            <div className="userregist">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <h3><label>Name</label>
                    <input onChange={handleName} value={Name} type="text" /></h3>
                    </div>
                    <div className="form-group">
                    <h3><label>Email</label>
                    <input onChange={handleEmail} value={Email} type="email" /></h3>
                    </div>
                    <div className="form-group">
         
                    <h3><label>Password</label>
                    <input onChange={handlePassword} value={Password} type="password" /></h3>
                    </div>
                    <div className="form-group">
                    <h3><label>Confirm Password</label>
                    <input onChange={handleConfirmpassword} value={Confirmpassword} type="password" /></h3>
                    </div>
                    <div className="form-group">
                    <h3><label>Mobile</label>
                    <input onChange={handleMobile} value={Mobile} type="number" /></h3>
                    </div>

                  
         
                    <h3><button>Submit</button></h3>
                </form>
            </div>

            <h3 className="texting">
                Already Have an Account ? <Link to="/userlogin">Login Here</Link>
            </h3>

        </div>
    )
}

export default UserRegister;
