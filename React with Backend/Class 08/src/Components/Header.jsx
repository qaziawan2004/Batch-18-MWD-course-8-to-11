import { useEffect, useState } from "react"

const Header = () => {
    const [count,setCount] = useState(0)
// let [count ,setCount] = useState(0)
// setcount(++count)
const [isDarktheme,setIsDarktheme] = useState(false)


// useEffect(()=> {
// console.log("dark theme");

// },[])

// // useEffect (callback,)

// //mounting
// useEffect( ()=> {
//     console.log("useEffect")
    
// },[])
// updating
useEffect(()=> {
console.log("API CALL");

},[count,isDarktheme])

return(
        <div style={{background: isDarktheme ? "black": "white"}}>
        {/* <h1>Hello Header</h1> */}
        <h2>React USEEFFECT!</h2>

        <button onClick={()=> {
            // setCount(++count) with let
            setCount(count + 1) //with const
}}>Click Counter : {count}</button>


    <button onClick={()=> setIsDarktheme(!isDarktheme)}>Dark Theme</button>

        </div>
    )
}
export default Header