import React from 'react'
import "../App.css"
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
const Dashboard = () => {

    return (
        <>
            <div className='dashboard'>
                <Navbar className="navbar"/>
                <div>
                    <h1 className='dash'>Welcome To Dashboard!</h1>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Dashboard