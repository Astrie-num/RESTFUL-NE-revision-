import React, { useState } from 'react';
import people from "../assets/images/images.png";
import "../components/css/login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Login() {
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    // console.log('Form submitted:', formData);
    // Here you can send the form data to your backend API
    try{
      const response = await axios.post('http://localhost:5000/login', formData);
      const {token} = response.data;
      localStorage.setItem('authToken', token);
      console.log('Token', token);
     
      alert("Login Successful!");
      navigate('/common');
    
    }catch(err){
      console.error('There was an error', err);
      alert('Login failed!');
    }

  };

  return (
    <div className='signup'>
      <form  className="form" onSubmit={handleSubmit} >
        <div className='container'>
        <h2 className='header'>Welcome back!</h2>
        {/* <p className='desc'>Enter your Credentials to access your account</p> */}
        </div>
        
      <div className='form-inputs'>
        <label htmlFor="emailAddress">Email</label>
        <br></br>
        <input
          type="email"
          name="emailAddress"
          placeholder="Enter your email address"
          value={formData.emailAddress}
          onChange={handleChange}
          required
        />
        <a  href='/signup' className='forgot'>forgot password?</a>
        <label htmlFor="password">Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />
      </div>

        <button type="submit">Login</button>
        <p className='link'>Don't have an account?<a href='/signup' className='link-a'>Sign Up</a></p>
      </form>
      <img src={people} alt= "happy people" className='people-image' />
    </div>
  );
}

export default Login;
