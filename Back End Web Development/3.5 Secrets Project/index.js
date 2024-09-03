import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded ({extended: true}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/public/index.html");
});

function passwordChecker(req, res, next){
    var enteredPassword = req.body["password"];
    if(enteredPassword === "ILoveProgramming"){
        next();
    }else {
        // res.sendFile(__dirname + "/public/index.html");
        res.redirect("/");
    }
}

app.use(passwordChecker);

app.post("/check", (req, res) =>{
    res.sendFile(__dirname + "/public/secret.html");
})

app.listen(port, (req, res) =>{
    console.log(`Listening on port ${port}`);
});