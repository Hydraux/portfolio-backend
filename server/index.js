import express from "express";
import cors from "cors";
import { run } from "./ses_sendemail.js";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors())
app.use(express.json());
app.get("/api", (req, res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.json({message: "Hello from server!"});
}
);

app.post("/api",async (req,res)=>{
    console.log(req.body);
    try {
        await run(req.body.from,req.body.body);
        res.json({message: "Email sent!", type: "Success"})
    } catch (error) {
        res.json({message: "Could not send email.", type: "Error"});
        console.error(error);
        return error;
    }
    
})

app.listen(PORT,()=>{
    console.log('Server listening on ' + PORT);
})

// run();
