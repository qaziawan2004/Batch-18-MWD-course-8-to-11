import { useState ,useEffect} from 'react'
import './App.css'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Body from './Components/Body.jsx'
import Child1 from './Components/Child1.jsx'
import Child2 from './Components/Child2.jsx'

function App() {
  // const [loading, setLoading] = useState(false)
  const [toggle,setToggle] = useState(false)

  // useEffect(() => {
  //   console.log("Loading");
  //   setLoading(true)

  // },[])
  return (
    <>
{/* 
      <h1>WELCOME TO Saylani!(App.jsx_)</h1>
      <Header />
      <Body />
      <Footer /> */}

{ toggle ?
      <Child1/> :
      <Child2/>
    } 
    <button onClick={()=>setToggle(!toggle)}>Toggle</button>
         </>
  )
}

export default App
