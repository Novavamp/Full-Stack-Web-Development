import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1><p>Welcome to my home page!</p>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Page</h1><p>My name is Precious Gabraels, and I am a NodeJS Web Develober using Express.</p>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Page</h1><p>Hello! You contact me on phone: +2348184893594 and mail: <a href='mailto:preciousgabraels@gmail.com'>preciousgabraels@gmail.com</a></p>");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});