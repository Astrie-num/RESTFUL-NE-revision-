import React, { useState } from 'react';
import people from "../assets/images/images.png";
import "../components/css/signup.css";
import { useNavigate } from 'react-router-dom';



function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    department: '',
    position: '',
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

  const HandleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log('Form submitted:', formData);

    const navigate = useNavigate();
    navigate('./login.jsx')

    // Here you can send the form data to your backend API
  };

  return (
    <div className='signup'>
      <form  className="form" onSubmit={HandleSubmit} >
        <h2 className='header'>Get Started Now!</h2>
      <div className='form-inputs'>
        <label for="firstname">Firstname</label>
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
        <label for="lastname">Lastname</label>
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
        <label for="department">Department</label>
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
        <label for="position">Position</label>
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
        <br /><br />
        <label for="password">Position</label>
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

        <button type="submit" onClick={HandleSubmit}>Register</button>
        <p className='link'>Have an account?<a href='./login.jsx'>Sign In</a></p>
      </form>
      <img src={people} alt= "happy people" className='people-image' />
    </div>
  );
}

export default SignUp;
