import express from "express"
import zod, { boolean } from "zod"
import jwt from "jsonwebtoken"
const router = express.Router();
import { JWT_PASSWORD } from "../config";
import userMiddleware from "../Middleware";
import { User } from "../db";

import crypto from "crypto";
import { Link,Content } from "../db"; // assuming Link model is defined properly
import { link } from "fs";


router.post("/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (!share) {
        await Link.deleteOne({
            // @ts-ignore
            userId: req.userId,
        })
        return;
    }
    try {
        const doesLinkExist = await Link.findOne({
            //@ts-ignore
            userId:req.userId
        })

        if(doesLinkExist){
            const link = doesLinkExist.hash;
            const fullLink = `http://localhost:1000/api/v1/brain/view/${link}`;
            res.status(200).json({
                "msg":"link already exist",
                Link:fullLink
            })
            return;
        }
        
        const hash = crypto.randomBytes(16).toString("hex");
        await Link.create({
            hash,
            //@ts-ignore
            userId: req.userId
        });

        const fullLink = `http://localhost:1000/api/v1/brain/view/${hash}`;

        res.status(200).json({
            link: fullLink
        });
        return;
    } catch (error) { 
        res.status(500).json({
            msg: "Failed to create shareable link",
            //@ts-ignore
            error: error.message
        });
    }
});




router.get("/view/:hash",async (req,res)=>{
    const hash = req.params.hash;
    const link = await Link.findOne({ hash });
    if (!link) {
        res.status(404).json({ msg: "Invalid or expired link" });
        return;
    }

    const userId = link.userId;
    const content = await Content.find({ userId });
    if(!content){
        res.status(403).json({
            msg:"empty content"
        })
    }

    const UserName = await User.findOne({
        _id:userId,
    })

    if(!UserName){
        res.status(400).json({
            msg:"user with this user id did not exist"
        })
        return;
    }

    const name = UserName.username;

    res.json({
        sharedBy: name,
        content
    });
    return;
})


export default router;