import jwt from "jsonwebtoken"

const authMiddleware  = async(req,res,next) =>{
try {

    const authHeaders = req.headers.authorization;

    const token = authHeaders.split(" ") [1];


    const isVerify = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (isVerify) {
        req.userId = isVerify._id,
        req.userEmail = isVerify.email,
        next()
    } else {
        throw new Error()
    }
    
} catch (error) {
    res.json({
        message: error.message,
        status: false
    })    
}

} 
export default authMiddleware