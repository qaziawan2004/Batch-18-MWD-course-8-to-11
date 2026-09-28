import { useState } from 'react'
import './App.css'

function App() {

  // const userName = "Mudassir Awan"
  // const para = `My name is Mudassir Awan`
  // const isLogin = true
  // true == USERNAME
  // fale == PLEASE LOGIN
// const postCreated = (name,e) => {
// alert(`POST CREATED! ` + name)
// alert(name,e)
// console.log(e.target.value);
// }
// let user = "user"
// console.log(`before call user`,user);
// const loginHandler = () => {
// user = "jaffar Aman"
// console.log("user",user);

// state - useState
//  interview q = usestate is a special type of variable var let const does not update value on ui with real time but useState does 
// react js ki aik library h jisko hm use krtay h user interactive website bananay k liye
// real DOM sari ui rerender krta h jb k virtual DOM sirf usi aik element ko rerender krta h jis ko hm chahtay h
// state return kya krta h =>  hameshay hamein ak array return krti h
// useState jb b update hota h hamara vo vala component rerender hota jis pr useState laga hota h
// react contain four components:- app, header, body, footer
// react virtual dom pr chalta h DOM ko use ni krta
// react app => virtual dom => real DOM => browser
// react app apna data manage kr k vd ko deta h vd data manage kr k rd or rd browser ko 
// node elements ko kehtay hay
// node 1 pr value 3 pr junkartifect

// const state = useState("Saylani")
// console.log("read",state[0])
// console.log("write",state[1])
// its a built in method of react


// const [userName,setUserName] = useState("Saylani")
const [userName,setUserName] = useState("USER ")


// console.log("user",user); yeh vala ni chalay ga



const loginHandler = () => {
  // setUserName(`SAYLANI MASS IT`)
    setUserName(`Mudassir Awan`)
    
  }
  console.log(userName);

  return (
    <>

      <div>

    {/* <h1>HELLO {user}!</h1> */}
    {/* <button onClick={loginHandler}>LOGIN!</button> */}

        {/* <h1>HELLO {userName}</h1> */}
      {/* <p>{para.toUpperCase()}</p> */}
        {/* <h1>{isLogin ? userName : "Please Login"}</h1> */}


        {/* <h1 className='heading1'>HELLO REACT! We are using css in this Element </h1> */}


        {/* <input type="text" name="" id="" /> */}
        {/* <button onClick={postCreated}>POST CREATE</button> */}
        {/* <button onClick={(e) => postCreated(`Jaffar` )}>POST CREATE</button> */}
      
      
      
      {/* <h1 style={{color: "red"}}>HELLO</h1> */}
      



{/* <h1>HELLO USERNAME</h1> */}
 <h1 className='heading1'>HELLO {userName}</h1>

<button onClick={loginHandler}>LOGIN</button>
 
 
      </div>

    </>
  )
}

export default App
