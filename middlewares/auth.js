import User from "../models/user.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req, res, next) => {
    try{
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({message: "Please Login"});
        }else{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            const user = await User.findById(decoded._id)
            if(user){
                req.user = user;
                next();
            }else{
                return res.status(401).json({message: "Invalid Token"}); 
            }   
        }
    }
    catch(err){
        return res.status(401).json({message: "Please Login"});
    }
}