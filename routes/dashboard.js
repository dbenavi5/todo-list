import express from "express";
import pool from "../connection/dbConnection.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();

router.post("/", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
