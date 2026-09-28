import { useState } from 'react'
import './App.css'

function App() {
// const [count,setCount] = useState(0)
const [data,setData] = useState(["Jaffar","Sufiyan"])

// const UIArray = data.map((value,index) => {
//   return <h1 key={index}>Hello {value}</h1>
// })
// console.log("UIArray",UIArray);

const [name,setName] = useState("")

const getUserName = ()=> {

  // console.log(document.getElementById("userName").value);
  
  console.log("new state name",name);
  
}


const setUserName = () => {
setName(name)
console.log("name",name)

}


const [gender,setGender] = useState("")
return (
    <>
      {/* <h1>REACT JS!</h1> */}
      <h1>REACT Forms!</h1>
    {/* {UIArray} */}
    {/* data.map((val,index) => {
      return <h1 key={index}>Hello World!</h1>
    }) */}

<h1>Select your gender</h1>

<label htmlFor="">
  <input  onChange={e => console.log();
  } type="radio" name='gender' value={"male"} />
Male
</label>
<label htmlFor="">
  <input type="radio" name='gender' value={"female"} />
Female
</label>
<input  value={name} type="text" name="userName" id="userName" placeholder="Enter your Name" onChange={(e)=>{
  console.log("e.target.value",e.target.value)
  setName(e.target.value)
}} />
<br /> <br />
<button onClick={getUserName}>GET USERNAME!</button>
<button onClick={setUserName }>Set USERNAME</button>

<h1>{name}</h1>

{/* <h1>{userName}</h1> */}
    </>
  )
}

export default App
