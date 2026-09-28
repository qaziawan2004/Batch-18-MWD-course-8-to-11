
let signUp = async () => {
try {
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("c-password").value;

    if (!fullName || !email || !password || !confirmPassword) {
        alert(`Required Fileds are missing`)
        return
    }
    if (password !== confirmPassword) {
        alert(`password and confirm password does not match!`)
        return
    }
    let userData = {
        fullName,
        email,
        password,
        confirmPassword
    }

    const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }).then(res => res.json())
    if (res.status) {
        alert(`Account Created Successfully`);
        window.location.assign("./login.html")
    } else {
        alert(res.message)
    }
    
} catch (error) {
alert(error.message)    
}

}

window.signUp = signUp