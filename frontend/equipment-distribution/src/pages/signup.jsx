import React, { useState } from 'react';
import people from "../assets/images/images.png";
import "../components/css/signup.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    department: '',
    position: '',
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

  const HandleSubmit = async(e) => {
    e.preventDefault(); // prevent page refresh
    console.log(formData);
    try{
      await axios.post('http://localhost:5000/register', formData);
      alert("Registration Successful!");
    
      navigate('/login');
    }catch(err){
      console.error('There was an error', err);
      alert('Registration failed!');
    }

  };

  return (
    <div className='signup'>
      <form  className="form" onSubmit={HandleSubmit} >
        <h2 className='header'>Get Started Now!</h2>
      <div className='form-inputs'>
        <label htmlFor="firstname">Firstname</label>
        <br></br>
        <input
          type="text"
          name="firstname"
          placeholder="Enter your firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label htmlFor="lastname">Lastname</label>
        <br></br>
        <input
          type="text"
          name="lastname"
          placeholder="Enter your lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label htmlFor="department">Department</label>
        <br></br>
        <input
          type="text"
          name="department"
          placeholder="Enter department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label htmlFor="position">Position</label>
        <br></br>
        <input
          type="text"
          name="position"
          placeholder="Enter position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <br /><br />
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
        <br /><br />
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

        <button type="submit">Register</button>
        <p className='link'>Have an account?<a href='/login'>Sign In</a></p>
      </form>
      <img src={people} alt= "happy people" className='people-image' />
    </div>
  );
}

export default SignUp;
