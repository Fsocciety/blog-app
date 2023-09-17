import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

function HeaderMenu() {

  const { currentUser, logout } = useContext(AuthContext)


  return (
    <div className='header-menu'>
      <ul>
        <Link className='link' to="/?category=art">ART</Link>
        <Link className='link' to="/?category=science">SCIENCE</Link>
        <Link className='link' to="/?category=technology">TECHNOLOGY</Link>
        <Link className='link' to="/?category=cinema">CINEMA</Link>
        <Link className='link' to="/?category=design">DESIGN</Link>
        <Link className='link' to="/?category=food">FOOD</Link>
        {currentUser ? (
          <>
            <div className='user-links'>
              <img src="https://www.w3schools.com/howto/img_avatar.png"/>
              <Link className='username'>{currentUser?.username}</Link>
            </div>
            <Link className='link' onClick={logout}>LOGOUT</Link>
          </>
        ) : (
          <div className='user-links'>
            <Link className='link' to={"/login"}>Login</Link>
          </div>
        )}
        <Link className='link' to="/write">Write</Link>
      </ul>
    </div>
  )
}

export default HeaderMenu