const pool = require('../../config/db')
const jwt = require('jsonwebtoken');

// create api for users data
const users = async (req, res) => {
  console.log('API users', req.body)

  let userData = [
    req.body.firstname,
    req.body.lastname,
    req.body.age,
    req.body.username,
    req.body.password,
    req.body.status,
  ];

  try {
    pool.query(`INSERT INTO
      users(firstname, lastname, age, username, password, status)
      VALUES($1, $2, $3, $4, $5, $6) returning *`, userData, (error, result) => {
      if (error) {
        throw error
      }
      return res.status(200).json(result.rows);
    });
  } catch (error) {
    console.log(`failed: ${error}`)
    return res.status(400).send('failed to create');
  }
};

// Login API to create token
const login = async (req, res) => {
  console.log('API login with Token', req.body)

  const { username } = req.body;

  try {
    const userData = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);
    if (!userData) {
      return res.status(400).send('Invalid user');
    }
    const tokenData = {
      id: userData.rows[0].id,
      username: userData.rows[0].username,
      firstname: userData.rows[0].firstname,
      lastname: userData.rows[0].lastname,
    };
    const token = jwt.sign(
    tokenData,
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).send({ token: token });
  } catch (error) {
    console.log(`failed: ${error}`)
    return res.status(400).send('failed to create');
  }
};


//API for user verification
const verification = async (req, res) => {
  console.log('API for verifying the user')
  const { userId } = req.body;
  const uniqueCode = Math.random().toString(36).slice(-6);
  console.log("**8uniqueCode", uniqueCode);
  try {
    if (userId) {
      pool.query(
        `UPDATE users SET verification_code = '${uniqueCode}' WHERE id = ${userId} returning *`,
        (error, updatedResult) => {
          if (error) {
            throw error;
          }
          return res.status(200).json(updatedResult.rows);
        }
      );
    } else {
      return res.status(400).send("User ID does not exist!");
    }
  } catch (error) {
    console.log(`failed: ${error}`);
    return res.status(400).send("failed to update user unique code");
  }
};

module.exports = {
  users,
  login,
  verification,
};