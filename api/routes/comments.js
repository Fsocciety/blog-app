const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  const q = req.query.postid
    ? `SELECT comments.id, comment, uid, postid, users.username, users.avatar
    FROM comments
    JOIN users
    ON uid = users.id
    WHERE postid = ?`
    : `SELECT comments.id, comment, uid, postid, users.username, users.avatar
    FROM comments
    JOIN users
    ON uid = users.id`;
  db.query(q, req.query.postid, (err, data) => {
    if (err) return res.json("Comments/Postid error: " + err);
    res.json(data);
  });
});

router.post("/", (req, res) => {
  const { comment, date, uid, postid } = req.body;
  db.query(
    "INSERT INTO comments (comment, date, uid, postid) VALUES (?, ?, ?, ?)",
    [comment, date, uid, postid],
    (err, data) => {
      if (err) return res.json("Post comment error:" + err);
      res.json({ data: data, status: "Comment posted" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM comments WHERE id = ?", req.params.id, (err, data) => {
    if (err) return res.json("Delete comment error: " + err);
    res.json({ data: data, status: `Comment id: ${req.params.id} deleted` });
  });
});

module.exports = router;
