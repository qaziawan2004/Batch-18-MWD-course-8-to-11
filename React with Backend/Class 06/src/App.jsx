// import { useState } from "react"
// import Navbar from "./components/navbar.jsx"
// import Counter from "./components/counter.jsx"
// import Footer from "./components/footer.jsx"

// const App =() => {

//   // const userName  = `JAFFAR AMAN`
   const [userName, setUserName] = useState("Jaffar")
   const foo = ()=> {
 // setUserNamer("FAIZAN CHAKKA")
 console.log("foo",foo)
 }
 const [title ,setTitle] = useState("My COUNTER")

 const getTrainerValue = (value)=> {
 console.log("getTrainerValue",value);
  }

// const [arr,setArr] = useState(["Jaffar","Mudassir","Faizan Chawla"])
  
// const obj = {

// }
// return(
//     <div>
//         {/* <h1>Parent component</h1>
    
//       {/* <Navbar name = {userName} age={20} /> */}
// {/*     
//      <Navbar  userName={userName} foo={foo} 
//     setUserName= {setUserName}  getTrainerValue={getTrainerValue}/>
//     <Counter title ={title} />
//     <Footer data={["Apple " ,"mango",]}  age={20}/> */}
//      {/* <button onClick={()=>{
//       setUserNamer("MUDASSIR")
//      }}>UPDATE NAME!</button> */} */

//     </div>
//   )

// }
// export default App




import { useState,React } from "react"

 const App =() => {


const [arr,setArr] = useState(["Jaffar","Mudassir","Faizan Chawla"])
  
 const obj = {

 }
 return(
     <div>

arr.map((USER:{arr[0]}))
     </div>
   )

 }
 export default App