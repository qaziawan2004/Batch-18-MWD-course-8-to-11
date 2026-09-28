import { useState, React } from "react"

const Counter = (props) => {
const [count ,setCount] = useState(0)

const Add = ()=>{
setCount(count + 1)
console.log(count)
}

const Sub = ()=>{
if(count !== 0){
setCount(count - 1)
console.log(count)}
}

let Res = ()=>{
setCount(0)
console.log(count)
}

return(
        <>
        <h2>{props.title}</h2>
        <h1>{count}</h1>
        <button onClick={Add}>Add</button>
        <button onClick={Sub}>Sub</button>
        <button onClick={Res}>Res</button>
        </>
    )

}
export default Counter