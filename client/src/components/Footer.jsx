import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <Link className="logo" to="/">
          Blog
        </Link>
        <p>Blog 2023</p>
      </div>
    </div>
  )
}

export default Footer