import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HospitalDisplay.css';
const HospitalDisplay = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/hospitalrecords');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteRecord/${id}`);
      // Remove the deleted record from the state
      setRecords(records.filter(record => record._id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/hospitallogin');
  };

  return (
    <div>
      <h1>Hospital Records</h1>
      {records.map(record => (
        <div key={record._id} className="hospital-record">
          <div className="record-box">
          <h3>{record.Name}</h3>
          <h3>Mobile: {record.Mobile}</h3>
          <h3>Location: {record.Location}</h3>
          <h3>Hospital: {record.Hospital}</h3>
          <button onClick={() => handleDelete(record._id)}>Delete</button>
        </div>
        </div>
      ))}
      <br></br>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HospitalDisplay;
