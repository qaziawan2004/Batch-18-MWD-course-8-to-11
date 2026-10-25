import React, { useState } from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confPassword,setConfPassword] = useState("")
  const navigate = useNavigate()
  const signupHandler = async(e) => {
    e.preventDefault()

try {
      if (!fullName ||!email || !password || !confPassword) {
      return alert("Required fields are missing!")
    }

    if (password !== confPassword) {
      return alert("Password and ConfirmPassword are not matching")
    }

    const body ={
      fullName,
      email,
      password,
      confPassword
    }
    console.log("body",body);
    
    const response = await fetch(`${BASE_URL}/api/signup`,{
      method :"POST",
      headers:{
        "Content-Type":"application/json",

      },
      body:JSON.stringify(body)
    })
    console.log("response",response);
    
    const data = await response.json()
    console.log(data);

    if (!response.status|| !data.status) {
      return alert(data.message ||`SignUp Failed!`)
    }

    navigate("/login")
    


} catch (error) {
// console.error("Signup error:", error);
      alert(error.message || "API request failed!");
}
}
  return (
    <>
      <form onSubmit={signupHandler}>
        <h1>Create Account</h1>
        <input type="text" placeholder="Please! Enter your fullName!" value={fullName} id="fullName" onChange={(e) => setFullName ( e.target.value)} required />
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="userEmail" placeholder="Please! Enter your Email!" required />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" placeholder="Please Enter your Password!"  required/>
                <input onChange={(e) => setConfPassword(e.target.value)} value={confPassword} type="password" id="conf-pass" placeholder="Confirm! your password!" required />
                <div className='div'>
                  <Link to="/login" >Alreaady have an Account!</Link>
                  <button type='submit'>SignUp</button>
                </div>

      </form>
    </>
  )
}

export default Signup
