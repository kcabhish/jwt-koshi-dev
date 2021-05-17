const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const users = require('./mockData');

app.use(express.json());



let x = require('crypto').randomBytes(64).toString('hex');
console.log(x);
// Gets the port value from the .env file, otherwise uses the default value of 3000
const PORT = process.env.PORT || 3000;

app.get("/users", (req,res) => {
   res.json(users)
})

app.post("/login", (req,res) => {
    console.log(req.body)
    // Authenticate user
})
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
})