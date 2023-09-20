const express = require("express");
const db = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res) => {
  // Check if user exists
  db.query(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [req.body.email, req.body.username],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exists");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const values = [req.body.username, req.body.email, hash];
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
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
  try {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      req.body.username,
      (err, data) => {
        if (err) return res.json(err);
        if (!data.length) return res.status(404).json("User not found");
        console.log(data);
        const isPasswordOk = bcrypt.compareSync(
          req.body.password,
          data[0].password
        );
        if (!isPasswordOk) return res.json("Wrong password");

        const { password, ...other } = data[0];
        const token = jwt.sign({ id: data[0].id }, process.env.JWT);
        res.cookie("access_token", token, { httpOnly: true });
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
