import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, password, email } = credentials
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();

    if (json.sucess) {
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Sucess", "Login Succesfull")
      navigate("/");
    }
    else {
      props.showAlert("Error", "Inavlid credentials")
    }
  }



return (
  <div>
    <form>
      <div className="mb-3 my-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} required />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="current-password" name='current-password' onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm-Password</label>
        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
    </form>
  </div>
)
}

export default Signup
