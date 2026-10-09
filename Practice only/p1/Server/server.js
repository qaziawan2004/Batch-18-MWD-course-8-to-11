import express from "express";
import cors from "cors";

const PORT = 3300;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json(
        `server running on http://localhost:${PORT}`)
});


app.post("/signup", (req, res) => {
    try {
        const fullName = req.body.fullName;
        const Email = req.body.Email;
        const Password  = req.body.Password;
        const confirmPassword = req.body.confirmPassword
        if( !fullName || !Email || !Password || !confirmPassword){
            res.json(`Please Enter credentials`);
            return;
        }
        else if (Password !== confirmPassword) {
            res.json(`password and confirm password does not match!`); 
            return;
        }
        const userObj = {
            fullName,
            Email,
            Password,
            confirmPassword
        };
        

        res.json({
            fullName,
            Email,
            Password,
            confirmPassword
        }
        )
    } catch (error) {
        res.json(error)
    }
})
app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
