import express from "express"
import cors from "cors"
const port = 1000
const app = express();
app.use(cors());
app.use(express.json());

app.post('/',(req,res)=>{
    // we have to add functionality that if user hit default route then if he is logged in already the route to dashboard ohterwise route
    // sign in page
    res.send("defualt route")
})

import userrouter from "./routes/route"; 
app.use("/api/v1",userrouter);

import brainrouter from "./routes/brainroute";
app.use("/api/v1/brain",brainrouter);

app.listen(port); 