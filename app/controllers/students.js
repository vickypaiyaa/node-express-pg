const pool = require("../../config/db");

// create api for student data
const students = async (req, res) => {
  console.log("API students", req.body);

  let studentData = [
    req.body.firstname,
    req.body.lastname,
    req.body.age,
    req.body.section,
    req.body.address,
    req.body.email,
    req.body.contact_number,
  ];

  try {
    pool.query(
      `INSERT INTO
      students(firstname, lastname, age, section, address, email, contact_number)
      VALUES($1, $2, $3, $4, $5, $6, $7) returning *`,
      studentData,
      (error, result) => {
        if (error) {
          throw error;
        }
        return res.status(200).json(result.rows);
      }
    );
  } catch (error) {
    console.log(`failed: ${error}`);
    return res.status(400).send("failed to create student data");
  }
};

// Fetch all student data
const getAllStudents = async (req, res) => {
  console.log("API fetch all students");

  try {
    const limit = req.body.limit ? req.body.limit : 5;
    const offset = req.body.offset ? req.body.offset : 0;
      
    pool.query(
      `SELECT * FROM students ORDER BY id ASC LIMIT ${limit} OFFSET ${offset};`,
      (error, allData) => {
        if (error) {
          throw error;
        }
        return res.status(200).json(allData.rows);
      }
    );
  } catch (error) {
    console.log(`failed: ${error}`);
    return res.status(400).send("failed to create student data");
  }
};

function updatedStringConversion(data) {
  let updatedString = "";
  const allKey = Object.keys(data);
  for (let index = 0; index < allKey.length; index++) {
    if (data[allKey[index]] === null)
      updateString += allKey[index] + " = " + data[allKey[index]];
    else if (data[allKey[index]] === "")
      updateString += allKey[index] + " = " + null;
    else updatedString += allKey[index] + " = '" + data[allKey[index]] + "'";
    if (index != allKey.length - 1) {
      updatedString += ",";
    }
  }
  return updatedString;
}
// PATCH API to update student data
const updateStudent = async (req, res) => {
  console.log("API update a student");
  const { studentId } = req.params;
  // const firstname = req.body.firstname ? req.body.firstname : null;
  // const lastname = req.body.lastname ? req.body.lastname : null;
  // const age = req.body.age ? req.body.age : null;
  // const section = req.body.section ? req.body.section : null;
  // const address = req.body.address ? req.body.address : null;
  // const email = req.body.email ? req.body.email : null;
  // const contact_number = req.body.contact_number
  //   ? req.body.contact_number
  //   : null;
  try {
    if (studentId) {
      let updatedString = updatedStringConversion(req.body); //create update string object for pass only required fields
      pool.query(
        `UPDATE students SET ${updatedString} WHERE id = ${studentId} returning *`,
        (error, updatedResult) => {
          if (error) {
            throw error;
          }
          return res.status(200).json(updatedResult.rows);
        }
      );
    } else {
      return res.status(400).send("Student ID does not exist!");
    }
  } catch (error) {
    console.log(`failed: ${error}`);
    return res.status(400).send("failed to update student data");
  }
};

module.exports = {
  students,
  getAllStudents,
  updateStudent
};
