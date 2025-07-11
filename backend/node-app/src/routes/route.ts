import zod from "zod"
import express from "express";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { User,Content } from "../db";
import bcrypt from "bcrypt";
const router = express.Router();
router.use(express.json());
import { JWT_PASSWORD } from "../config";
import userMiddleware from "../Middleware";


const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string()
    .regex(/[A-Z]/, "must contain capital letter")
    .regex(/[a-z]/, "must contain lowercase letter")
    .regex(/[0-9]/, "must contain digit")
    .regex(/[@$!%*?&]/, "must contain special character")
});

enum ResponseStatus {
    SignedUp      = 200,
    SignedIn      = 200,
    ErrorInInputs = 411,
    userNotExist  = 411,
    UserExists    = 403,
    PasswordIncoorect = 411,
    ServerError   =   500
}

// user can signup
router.post("/signup", async (req, res) => {
    try {
        // applying zod validation and hash the password before storing in db
        const response = signupSchema.safeParse(req.body);
        if (!response.success){
            res.status(ResponseStatus.ErrorInInputs).json({
                msg: "wrong inputs"
            });
            return;
        }

        const username = req.body.username;
        const password = req.body.password;

        const finduser = await User.findOne({
            username: username
        });

        if (finduser) {
            res.status(ResponseStatus.UserExists).json({
                msg: "user already exist"
            });
            return;
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        const NewUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(ResponseStatus.SignedUp).json({
            msg: "user created", 
        });
        return;

    } catch (error) {
        res.status(ResponseStatus.ServerError).json({
            msg: "server error"
        });
        return;
    }
});


const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string() // no strict password rules here
});




router.post("/signin",async(req,res)=>{
try{
        const username  = req.body.username;
        const password  = req.body.password;
        const response = signinSchema.safeParse(req.body);

        if(!response.success){
            res.status(ResponseStatus.ErrorInInputs).json({
                msg:"error in inputs"
            })
            return;
        }

        const Users = await User.findOne({
            username,
        })

        if(!Users){
            res.status(ResponseStatus.userNotExist).json({
                msg:"user do not exist"
            })
            return;
        }

        const IsPAssCorrect = await bcrypt.compare(
            password,
            Users.password
        )

        if(!IsPAssCorrect){
            res.status(ResponseStatus.PasswordIncoorect).json({
                msg:"password incorrect"
            })
            return;
        }
        const userId = Users._id;
        const token = jwt.sign({
            userId
        },JWT_PASSWORD);

        res.status(ResponseStatus.SignedIn).json({
            msg:"user signed in",
            token
        })
        return;
}
    catch (error) {
        res.status(ResponseStatus.ServerError).json({
            msg: "server error"
        });
        return;
    }

})

router.post("/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await Content.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.json({
        message: "Content added" 
    }) 
})    

router.get("/content", userMiddleware, async (req, res) => {

    try {
        // @ts-ignore
        const userId = req.userId;
        const content = await Content.find({
            userId: userId
        }).populate("userId", "username");

        res.json({ content });
    } catch (error) {
        console.error("Error in GET /content:", error); 
        res.status(500).json({
            msg: "Internal Server Error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    } 
});

router.delete("/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await Content.deleteMany({ 
        _id:contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "Deleted"
    }) 
})


export default router