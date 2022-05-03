import express from "express";
import pool from "../connection/dbConnection.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";
import validInfo from '../middleware/validInfo.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

// registering
router.post("/register", validInfo, async (req, res) => {
  try {
    // 1. Destructure the req.body (aka data).=> (name, email, password)
    const { name, email, password } = req.body;
    // 2. Check if user exist (if user exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      // then user already exist!
      return res.status(401).json("User already exist!");
    }
    // 3. Bcrypt the users password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. Enter the user inside the database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
      
    // 5. Generating our jwt token.
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// login routes
router.post('/login', validInfo, async (req, res) => {
  try {
    // 1. destructure req.body
    const { email, password } = req.body;

    // 2. check if user doesn't exist (if not then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json('User does not exist')
    }

    // 3. check if incoming password is the same as the database password
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      res.status(401).json("Password or  Email is incorrect");
    }
    // 4. give them jwt token
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verified",authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
