const AuthCheck = () => {
    
}
let login = async () => {
try {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if ( !email || !password ) {
        alert(`Required Fileds are missing`)
        return
    }
    let userData = {
        email,
        password,
    }

    const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }).then(res => res.json())
    if (res.status) {
        alert(`Logged in Successfully`);
        window.location.assign("./index.html")
    } else {
        alert(res.message)
    }
    
} catch (error) {
alert(error.message)    
}

}

window.login = login