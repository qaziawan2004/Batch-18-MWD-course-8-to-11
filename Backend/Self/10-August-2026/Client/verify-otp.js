const API_BASE = "http://localhost:4000";

// Show the email the OTP was sent to (set by signup.js before redirecting here)
const showPendingEmail = () => {
    const email = localStorage.getItem("pendingEmail");
    const emailSpan = document.getElementById("userEmail");
    if (email && emailSpan) {
        emailSpan.textContent = email;
    }
};
showPendingEmail();

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
            localStorage.removeItem("pendingEmail");
            window.location.replace("./login.html");
        } else {
            alert(res.message);
        }
    } catch (error) {
        alert(error.message);
    }
};

// Resends a fresh OTP if the old one expired, with a short cooldown to avoid spamming
let resendCooldown = false;

const resendOtp = async () => {
    try {
        if (resendCooldown) {
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please login again.");
            window.location.replace("./login.html");
            return;
        }

        const resendLink = document.getElementById("resendLink");

        const res = await fetch(`${API_BASE}/reset-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json());

        if (res.status) {
            alert("A new OTP has been sent to your email.");
            startResendCooldown(resendLink);
        } else {
            alert(res.message);
        }
    } catch (error) {
        alert(error.message);
    }
};

// Disables the resend link for 30 seconds after a successful resend
const startResendCooldown = (resendLink) => {
    if (!resendLink) return;

    resendCooldown = true;
    let secondsLeft = 30;
    resendLink.classList.add("disabled");
    resendLink.textContent = `Resend OTP (${secondsLeft}s)`;

    const interval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
            clearInterval(interval);
            resendCooldown = false;
            resendLink.classList.remove("disabled");
            resendLink.textContent = "Resend OTP";
        } else {
            resendLink.textContent = `Resend OTP (${secondsLeft}s)`;
        }
    }, 1000);
};

window.verifyOtp = verifyOtp;
window.resendOtp = resendOtp;