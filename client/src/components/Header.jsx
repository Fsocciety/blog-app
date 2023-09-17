import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx'
import HeaderMenu from './HeaderMenu.jsx'
import menuIcon from '../assets/menu.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUser, logout } = useContext(AuthContext)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="header">
      <div className="container">
        <Link className="logo" to="/">
          Blog
        </Link>
        <div className="links">
          <Link className='link' to="/?category=art">ART</Link>
          <Link className='link' to="/?category=science">SCIENCE</Link>
          <Link className='link' to="/?category=technology">TECHNOLOGY</Link>
          <Link className='link' to="/?category=cinema">CINEMA</Link>
          <Link className='link' to="/?category=design">DESIGN</Link>
          <Link className='link' to="/?category=food">FOOD</Link>
          {currentUser ? (
            <div className='user-links'>
              <img src="https://www.w3schools.com/howto/img_avatar.png"/>
              <Link className='link'>{currentUser?.username}</Link>
              <Link className='link' onClick={logout}>LOGOUT</Link>
            </div>
          ) : (
            <div className='user-links'>
              <Link className='link' to={"/login"}>Login</Link>
            </div>
          )}
          <Link className='link' to="/write">Write</Link>
        </div>
        <img src={menuIcon} onClick={toggleMenu} className="menu-btn"/>
      </div>
      {isMenuOpen && <HeaderMenu />}
    </div>
  )
}

export default Header