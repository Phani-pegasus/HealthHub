import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDisplay.css';
const UserDisplay = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [Name,setName]=useState('');
  const [Mobile,setMobile]=useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/hoslocations');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await fetch(`http://localhost:3001/hosnames?location=${selectedLocation}`);
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };
  const handleloc = async(e) =>{
    e.preventDefault();
    fetchHospitals();
  }

  const handleName=async(e)=>{
    setName(e.target.value);

  }
  const handleMobile=async(e)=>{
    setMobile(e.target.value);

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/Usersubmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name,
          Mobile,
          Location: selectedLocation,
          Hospital: selectedHospital,
        }),
      });

      if (response.ok) {
        alert('Emergency Booking details are placed to the corresponding hospital');
        navigate('/userlogin'); // Navigate to the homepage or any other page
      } else {
        alert('Failed to store user details');
      }
    } catch (error) {
      console.error('Error storing user details:', error);
      alert('An error occurred while storing user details');
    }

    
    
    
  };

  return (
    <div>
      <h1>The Single step for Emergency Booking</h1>
      <h1>Enter User Details</h1>
      <div className='userdisplay'>
      <form onSubmit={handleloc}>
        
       
          <div className='form-group'>
            <h3><label>Name</label>
            <input onChange={handleName} value={Name} type="text" /></h3>
          </div>
          <div className='form-group'>
            <h3><label>Mobile</label>
            <input onChange={handleMobile} value={Mobile} type="number" /></h3>
          </div>
          <div className='form-group'>
            <h3><label>Location:</label>
            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select></h3>
          </div>
          <button type="submit">Submit</button>
        </form>
        
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <h3><label>Hospital Name:</label>
            <select value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select></h3>
          </div>
          <button type="submit">Submit</button>
        </form>
        </div>
      </div>
  
  );
  
};


export default UserDisplay;
