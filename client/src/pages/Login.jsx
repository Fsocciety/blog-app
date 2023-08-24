import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:8080/auth/login", inputs, {withCredentials: true});
      await login(inputs);
      navigate('/')
    } catch (err) {
      // setError(err.response.data)
    }
  }
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-wrapper'>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder='Enter username' id='username' name='username' onChange={handleChange}/>
        </div>
        <div className='input-wrapper'>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter password' id="password" name='password' onChange={handleChange}/>
        </div>
        <button className='btn'>Login</button>
        <Link className='btn register-btn' to={"/register"}>Register</Link>
        {error ? (
          <p>{error}</p>
          ) : (
          <></>
        )}
      </form>
    </div>
  )
}

export default Login