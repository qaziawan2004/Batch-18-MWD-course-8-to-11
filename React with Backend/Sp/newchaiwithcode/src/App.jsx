import { useState } from 'react'
import './App.css'

function App() {
let [count ,setCount] = useState(0)
let add = () => {
  if (count !== 20) {
    setCount (count + 1)
  }
  return
} 
let sub =()=> {
  if (count !== 0) {
    setCount (count - 1)
  }
  return
}

return (
    <>
    <h1>counter : {count}</h1>
    <br />
    <button onClick={add}>Increase</button>
    <button onClick={sub}>Decrease</button>
    </>
  )
}

export default App
