import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  //   const [name, setName] = useState("")
  //   const [errorText,setErrorText ] = useState("")
  //   const inputRef = useRef(null)


  //   useEffect(() => {
  //     // console.log("Name useEffect",name);
  //     if (!name){
  //       setErrorText("")
  //       return}

  //       if (name.length < 8) {
  //         // console.log("max 8 characters");
  //         setErrorText("max 8 characters")
  //       }
  // else{
  //   setErrorText("")
  // }    

  //   }, [name])



  //   const getInputRef = () => {
  //     console.log("inputRef", inputRef);
  //     inputRef.current.value = name

  //   }

  // its rule that we cannot asyncronize call back function in react'useEffect
  // useEffect(()=>{
  //   getData()

  // },[])

  //   const getData = async() => {
  //     const data = await fetch("https://api-v2.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false&skills").then(res=> res.json())
  // console.log("data",data);
  // }

  // useEffect(()=>{
  //   getJobData()
  // },[])

  // const getJobData = async()=> {
  // try {
  //   const data = await axios.get("https://api-v2.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&k  eyWord=&category=&isPending=false&skills")
  //   console.log("data",data);
  // } catch (error) {
  //   alert("ERROR: " + error.message)
  // }
  // }

const [api,setApi] = useState([])
 
useEffect(() => {
    getJobData()
  }, [])

  const getJobData = async () => {
    try {
      const data = await axios.get("https://api-v2.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false&skills=")
      console.log("data", data);
      setApi(data.data.data)

    } catch (error) {
      alert("ERROR: " + error.message)
    }
  }



  return (
    <>
      {/* <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <small style={{color:"red"}}>{errorText}</small>
        <input ref={inputRef} type="text" />
        <h1>{name}</h1>
        <button onClick={getInputRef}>Submit</button>
        <button onClick={() => setName("")}>Clear</button>
      </div> */}
      <div style={{display:'flex', border:"2px solid black",justifyContent:"center", alignItems:"center", flexDirection:"column" , gap:"10px" }} >
        <input type="text"  />
        <div style={{display:"grid", gridTemplateColumns:"repeat(2,250px)",gap:"40px" }}>
          {api.map((val,index)=> {
            return(
            <div key={index} style={{border:"2px solid black",borderRadius:"10px", display:'flex', flexDirection:"column", width:"200px",height:"200px",padding:"20px"}}>
              <h1 style={{fontSize:20}}>{val.designation}</h1>
              <b style={{color:"blue"}}>{val.companyName}</b>
              <p style={{display:"flex",flexDirection:"column"}}>{val.skills}</p>
            </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
