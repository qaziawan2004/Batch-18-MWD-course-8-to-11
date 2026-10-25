import React from 'react'
import "../App.css"
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation()

    const fullName = location.state?.fullName;
  return (
    <>
      <div className='nav'>
        <input type="text" placeholder="Search here!" id="searchfilter" />
        <h1 className='welcome'>Welcome, <span>{fullName || "Guest"}!</span></h1>
        {/* <button onClick={logoutHandler}>Logout</button> */}
      </div>
    </>
  )
}

export default Navbar
