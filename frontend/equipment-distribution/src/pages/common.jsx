import React from 'react';
import "../components/css/signup.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Common() {

    const navigate = useNavigate();
 
  const HandleSubmit = async(e) => {
    e.preventDefault();

    try{

    const token = localStorage.getItem('authToken');
    await axios.get('http://localhost:5000/admin-only', {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
      alert("Welcome Admin!");
      navigate('/display');
    }catch(err){
      console.error('There was an error', err);
      alert('Error! Only admins are authorized!');
    }

  };

  return (
    <div className='signup'>
      <form  className="form" onSubmit={HandleSubmit} >
        <h2 className='header'>Welcome!</h2>
        <button type="submit">View Users</button>
     </form>
       
    </div>
  );
}

export default Common;
