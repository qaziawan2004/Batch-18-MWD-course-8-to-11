import React, { useState } from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import OtpVerify from './OtpVerify.jsx'
const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  const [currentUser,setCurrentUser] = useState("")
  const loginHandler = async(e) => {
    e.preventDefault()

try {
      if (!email || !password ) {
      return alert("Required fields are missing!")
    }

    const body = {
      email,
      password,
    }
    // console.log("body",body);
    
    const response = await fetch(`${BASE_URL}/api/login`,{
      method :"POST",
      headers:{
        "Content-Type":"application/json",

      },
      body:JSON.stringify(body)
    })
    console.log("response",response);
    
    const data = await response.json()
    console.log(data.data.fullName);
    const fullName = data.data.fullName;
    setCurrentUser(fullName)
    navigate("/OtpVerify",{
      state:{
        fullName
      }
    })
    


} catch (error) {
// console.error("Signup error:", error);
      alert(error.message || "API request failed!");
}
}
  return (
    <>
      <form onSubmit={loginHandler}>
        <h1>Login To Continue!</h1>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="userEmail" placeholder="Please! Enter your Email!" required />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" placeholder="Please Enter your Password!"  required/>
                <div className='div'>
                  <Link to="/" >Don't have an Account!</Link>
                  <button type='submit'>Login</button>
                </div>

      </form>
    </>
  )
}

export default Login
