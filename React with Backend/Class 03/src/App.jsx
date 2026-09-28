// import { useState } from 'react'
import { use } from 'react'
import './App.css'
import Body from './components/Body'
import Footer from './components/Footer'
import Navbar from './components/Navabar'

function App() {
  // const [count, setCount] = useState(0)


  // var userName = "JAFFAR AMAN"
  
  const userName = "JAFFAR AMAN"
console.log(userName)

const foo = (userName,event) => {
console.log(`foo`,userName, event?.target?.innerHTML);
}
const foo2 = (e) => {
console.log(`foo`, event?.target);
}
// console.log(`run callback`)
// foo()
  return (
    <>
    {/* <h1>HELLO APP COMPONENT</h1> */}
    {/* <h1>navbar</h1>
    <h1>Body</h1>
    <h1>Footer</h1> */}
    {/* <Navbar/>
    <Body/>
    <Footer/> */}
  <h2 className="heading">Hello {userName}</h2>
      <h1>2 + 2 = {2 + 2}</h1>
      <input type="text"  />
      {/* <button onClick={foo}>CLICK!</button> */}
      {/* <button onClick={()=>{}}>ADD!</button> */}
            {/* <button onClick={(event)=>{console.log(`run callback`),foo(userName)
            }}>ADD!</button>
      
        <button onClick={foo2}>ADD!</button> */}
      
        <button onClick={()=>{
          foo()
          foo2()
        }}>ADD!</button>
      

    </>
  )
}

export default App
