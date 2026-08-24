const authCheck = () =>{
    const userId = localStorage.getItem("users")
    console.log(userId);
    
    if (userId) {
        window.location.replace("./dashboard.html")
    }
}

const loginHandler = async () => {
    try {

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (!email || !password) {
            alert(`Required fields are missing!`)
            return
        }
        const userObj = {
            email,
            password
        }
        const res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)

        })
        .then(res => res.json())
         if (res.status) {
            console.log(res);
            localStorage.setItem("users", res.data._id)
            localStorage.setItem("token", res.data.token)
            alert(`Login Successfull`)
            window.location.replace("./verify-otp")
            const goToVerifyOtp = (email) => {
    localStorage.setItem("pendingEmail", email);
    window.location.replace("./verify-otp");
};

// Verifies the OTP the user typed in
const verifyOtp = async () => {
    try {
        let otp = document.getElementById("otp").value;

        if (!otp) {
            alert("Please enter the OTP");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please login again.");
            window.location.replace("./login.html");
            return;
        }

        const res = await fetch(`${API_BASE}/otp-verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ otp })
        }).then(res => res.json());

        if (res.status) {
            alert("Email verified successfully!");
            window.location.replace("./login.html");
        } else {
            alert(res.message);
        }
    } catch (error) {
        alert(error.message);
    }
};

// Resends a fresh OTP if the old one expired
const resendOtp = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please login again.");
            window.location.replace("./login.html");
            return;
        }

        const res = await fetch(`${API_BASE}/reset-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json());

        if (res.status) {
            alert("A new OTP has been sent to your email.");
        } else {
            alert(res.message);
        }
    } catch (error) {
        alert(error.message);
    }
};

window.verifyOtp = verifyOtp;
window.resendOtp = resendOtp;
            window.location.replace("./dashboard.html")
        }

    } catch (error) {
        alert(error.message)
    }
}
window.loginHandler = loginHandler
window.authCheck = authCheck