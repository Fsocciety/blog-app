import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://blog-vhyd.onrender.com/auth/register", inputs, {withCredentials: true});
      navigate('/login')
    } catch (err) {
      setError(err.response.data)
    }
  }
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className='input-wrapper'>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder='Enter username' id='username' name="username" value={inputs.username} onChange={handleChange}/>
        </div>
        <div className='input-wrapper'>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Enter email address' id='email' name="email" value={inputs.email} onChange={handleChange}/>
        </div>
        <div className='input-wrapper'>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter password' id='password' name="password" value={inputs.password} onChange={handleChange}/>
        </div>
        <button className='btn'>Register</button>
        {error ? (
          <p>{error}</p>
          ) : (
          <></>
        )}
      </form>
    </div>
  )
}

export default Register