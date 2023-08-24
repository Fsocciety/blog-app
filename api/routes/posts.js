const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.get("/", (req, res) => {
  const q = req.query.category
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts";
  db.query(q, [req.query.category], (err, data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  console.log(req.cookies.access_token);
  db.query(
    "SELECT username, avatar, title, description, img, date, cat FROM users JOIN posts ON users.id = posts.uid WHERE posts.id = ?",
    [req.params.id],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
});

router.post("/", (req, res) => {
  db.query(
    "INSERT INTO posts (title, desc) VALUES (?, ?)",
    [req.body.title, req.body.desc],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
});

router.delete("/:id", (req, res) => {
  res.json(req.cookies);
});

router.put("/:id", (req, res) => {});

module.exports = router;
