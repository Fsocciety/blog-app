const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/:id", (req, res) => {
  db.query(
    `SELECT comments.id, comment, uid, postid, users.username, users.avatar
    FROM comments
    JOIN users
    ON uid = users.id
    WHERE postid = ?`,
    req.params.id,
    (err, data) => {
      if (err) return res.json("Error: " + err);
      res.json(data);
    }
  );
});

router.post("/", (req, res) => {
  const { comment, date, uid, postid } = req.body;
  db.query(
    "INSERT INTO comments (comment, date, uid, postid) VALUES (?, ?, ?, ?)",
    [comment, date, uid, postid],
    (err, data) => {
      if (err) return res.json(err);
      res.json({ data: data, status: "Comment posted" });
    }
  );
});

module.exports = router;
