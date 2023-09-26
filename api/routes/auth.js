const express = require("express");
const client = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res) => {
  const {email, username} = req.body;

  // Check if user exists
  client.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exists");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const values = [req.body.username, req.body.email, hash];
      client.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        values,
        (err, data) => {
          if (err) return res.json(err);
          return res.status(200).json("User registered successfuly");
        }
      );
    }
  );
});

router.post("/login", (req, res) => {
  console.log('login')
  try {
    client.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username],
      (err, result) => {
        console.log(result.rows);
        if (err) return res.json(err);
        if (!result.rows.length) return res.status(404).json("User not found");
        const isPasswordOk = bcrypt.compareSync(
          req.body.password,
          result.rows[0].password
        );
        if (!isPasswordOk) return res.json("Wrong password");

        const { password, ...other } = result.rows[0];
        const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT);
        console.log(token);
        res.cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 900000
        });
        res.status(200).json(other);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json("User logged out");
});

module.exports = router;
