import {Request,Response,NextFunction} from "express";
import { JWT_PASSWORD } from "./config";
import jwt from "jsonwebtoken";

function userMiddleware(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
    res.status(401).json({ msg: "Authorization header missing" });
    return;
  }
    const decoded =  jwt.verify(authHeader as string,JWT_PASSWORD);
    if(decoded){
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }
    else{
        res.status(403).json({
            msg:"you are not loged in"
        })
        return;
    }
}



export default userMiddleware;