import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const d = new Date();
let day = d.getDay();

app.set("view engine", "ejs");

if (day >= 1 && day <= 5){
    var dayText = "a weekday";
    var textDisplay = "it's time to work hard!";
} else {
    dayText = "the weekend";
    textDisplay = "it's time to have fun!";
}

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", { 
        dayText, 
        textDisplay 
    });
});

app.listen(port, () =>{
    console.log(`Listening on port ${port}.`);
});