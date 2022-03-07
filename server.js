const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
require("dotenv").config({ path: path.join(__dirname, `.env`) });

const users = require("./app/routes/user");
const students = require("./app/routes/student");

const checkToken = require("./config/auth");
const cors = require('cors');

//import DB connection
require("./config/db");
const app = express();

app.use(cors('http://localhost:3000'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//validate user auth token
app.use(async function (req, res, next) {
  checkToken(req, res, next)
})

//set routes for user and students
app.use('/api', users);
app.use("/api", students);

//application startup port listening
app.listen(process.env.ENV_PORT).on('listening', () => {
    console.log(`Application listening on port ${process.env.ENV_PORT}`);
});

module.exports = app;