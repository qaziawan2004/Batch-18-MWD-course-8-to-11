const authCheck = () =>{
    const userId = localStorage.getItem("users")
    console.log(userId);
    
    if (userId) {
        window.location.replace("./dashboard.html")
    }
}
const signUp = async () => {
    try {

        let fullName = document.getElementById("fullName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;



        if (!fullName || !email || !password || !confirmPassword) {
            alert(`Required fields are empty!`)
            return

        } else if (password !== confirmPassword) {
            alert(`password and confirm password does not match!`)
            return

        }
        const userObj = {
            fullName,
            email,
            password,
            confirmPassword
        }

        const res = await fetch(`http://localhost:4000/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        }).then(res => res.json())
        
        if (res.status) {
            alert(`Signup Successfull`)
            console.log(`Redirecting Now!!`)
            window.location.replace("./login.html")
        } else {
            alert(res.message)
        }
        console.log("res",res);
        
    } catch (error) {
        alert(error.message)
    }
}
window.signUp = signUp
window.authCheck = authCheck