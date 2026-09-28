import React from "react"
const Navbar = (props) => {
console.log("props",props)

const trainer = `Jaffar`
    return(
        <>
        <h1>Hello Navbar :{props?.userName}</h1>
        {/* {props?.name} */}
        <button onClick={()=> {
            props.setUserName("AFZAL KHATTAK")
            }}>CHILD BUTTON!</button>


        <button onClick={()=>{ 
            props.getTrainerValue(trainer) }}>Pass Value to Parent</button>
        </>
    )
}
export default Navbar