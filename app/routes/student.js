const express = require('express');
const {
  students,
  getAllStudents,
  updateStudent,
} = require("../controllers/students");

const router = express.Router();

// student Routes
router.post("/students", students);
router.get("/students", getAllStudents);
router.patch("/students/:studentId", updateStudent);

module.exports = router;