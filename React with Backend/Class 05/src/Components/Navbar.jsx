import { useState } from "react";

const Navbar = () => {

    const [isLogin, setIsLogin] = useState(false)//bolean
    console.log("Navbar");

    const loginHandler = () => {
        setIsLogin(true)
    }

    return (
        <>
            <h1>Navbar {isLogin ? "Jaffar Aman" : "Please Login"}</h1>
            <button onClick={loginHandler}>Login</button>
        </>
    )
}
export default Navbar