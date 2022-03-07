const express = require('express');
const { users, login, verification } = require("../controllers/users");

const router = express.Router();

// users Routes
router.post("/users", users);
router.post("/login", login);
router.post("/verification", verification);

module.exports = router;