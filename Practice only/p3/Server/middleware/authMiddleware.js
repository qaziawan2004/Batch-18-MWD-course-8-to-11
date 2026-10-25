import jwt from "jsonwebtoken"

const authMiddeleware = async(req,res,next)=> {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Barear ")){
            return res.status(401).json({
                status: false,
                message:"Autherization Required!",
                data:null
            });
        }
        const token =   authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            status:false,
            message:"Invalid or Expired Token",
            data: null
        })
    }
}

export default authMiddeleware;