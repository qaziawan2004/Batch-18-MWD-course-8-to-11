import { useEffect, useState } from "react"

const Body = () => {

    const [mount,setMount] = useState(false)

    const updateMount = () => {
        setMount(!mount)
    }
    return(

        <>
        
        <h1>{mount ? "Hello Body" :"Mount Run!"}</h1>
        <button onClick={updateMount}>{mount ? "Un Mount " :"Mount Run!"}</button>
        </>
    )
}
export default Body