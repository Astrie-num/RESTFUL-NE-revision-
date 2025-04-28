import React, { useState } from 'react';
import people from "../assets/images/images.png";
import "../components/css/login.css";



function Login() {
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log('Form submitted:', formData);
    // Here you can send the form data to your backend API
  };

  return (
    <div className='signup'>
      <form  className="form" onSubmit={handleSubmit} >
        <div className='container'>
        <h2 className='header'>Welcome back!</h2>
        {/* <p className='desc'>Enter your Credentials to access your account</p> */}
        </div>
        
      <div className='form-inputs'>
        <label for="emailAddress">Email</label>
        <br></br>
        <input
          type="email"
          name="emailAddress"
          placeholder="Enter your email address"
          value={formData.emailAddress}
          onChange={handleChange}
          required
        />
        <a  href='#' className='forgot'>forgot password?</a>
        <label for="password">Password</label>
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
        <p className='link'>Don't have an account?<a href='./signup.jsx' className='link-a'>Sign Up</a></p>
      </form>
      <img src={people} alt= "happy people" className='people-image' />
    </div>
  );
}

export default Login;
