import { useState } from 'react'
import './App.css'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'
import Footer from './Components/Footer.jsx'
import Navbar from './Components/Navbar.jsx'
import Card from './Components/Card.jsx'

function App() {
  // const [count, setCount] = useState(0)
  // let userName = "Saylani!";
// const 
// const state = useState("SAYLANI!")
// console.log("state",state);
// const [name , setName] = useState("Saylani")
//   const updatedVlaue = ()=> {
//     // userName = "SMIT"
//     // console.log(userName);
//     // state[1]("SMIT")
//     setName("SMIT")
//   }
// console.log("APP CMP");
// const [isRefresh, setIsRefresh] = useState(false)

// const [foo,setFoo] = useState(false)
// console.log(foo,"foo");


// const refreshHandler= ()=>{
//   setIsRefresh(true)
// }
// const [arr, setArr] = useState(["apple","mango"])
// console.log(arr,"arr");

// const updatedVlaue = ()=>{
// setArr(["apple","mango","orange"])
// const updatedArr = arr.push("orange")
// arr.push("orange")
// console.log(arr);
// setArr(arr)
// const newArr = [...arr,"orange"]
// setArr(newArr)
// }


// const updatedArr = ()=> {
// }


const [loading,isLoading] = useState(false)
const foo = ()=> {
setTimeout(()=> {
  isLoading()
},2000)
}
foo()
if (loading) {
  return <h1>Loading....</h1>
}

const [isAuth,setIsAuth]= useState(false)
return (
  <>
  isLoading ? <h1>Loading...</h1>:
  <div>
    {/* <h1>Hello WORLD</h1>
    <h1>HELLO SAYLANI</h1>
    <h1>Hello Batch 18</h1>
    <h1>HELLO STUDENTS</h1>
    <h1>Hello PAKISTAN</h1> */}


      <h1>{!isAuth ? "PLease Login":"WELCOME JAFFAR AMAN"}</h1>
    <button onClick={()=>{
      setIsAuth(true)
    }}>{!isAuth ? "Login":"Logout"}</button>
  </div>
    <div>
    {/* <Header />
    <h1>Hello App</h1>
    <Body />
    <Footer /> */}    
    </div> 
    <div>
      {/* <h1>Hello {name}</h1>
      <button onClick={updatedVlaue}>Update Value</button> */}
   
        {/* {!isRefresh ? "First Time re render":"Second Time re render"} 
        <button onClick={refreshHandler}>Click!</button> */}

      {/* <br />
      <br />
        <button onClick={updatedVlaue}>UPDATE ARRAY</button> */}
{/* <button onClick={()=>{
  setFoo(true)
}}>Click</button> */}

   {/* <Navbar />
   <Card/> */}
   
   
   

   
    </div>
    </>
  )
}

export default App
