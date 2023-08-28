const express = require("express");
const jwt = require("jsonwebtoken");
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
  db.query(
    "SELECT posts.id, username, avatar, title, description, img, date, cat FROM users JOIN posts ON users.id = posts.uid WHERE posts.id = ?",
    [req.params.id],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
});

router.post("/", (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.json("Not authenticated!");
  jwt.verify(token, process.env.JWT, (err, userInfo) => {
    if (err) return res.json("Token is not valid!");

    db.query(
      "INSERT INTO posts (title, description, img, cat, date, uid) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.category,
        req.body.date,
        userInfo.id,
      ],
      (err, data) => {
        console.log("proslo");
        if (err) return res.json(err);
        res.json("Post has been created");
      }
    );
  });
});

router.delete("/:id", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.json("Not authenticated!");

  jwt.verify(token, process.env.JWT, (err, userInfo) => {
    if (err) return res.json("Token is not valid!");

    const postID = req.params.id;
    db.query(
      "DELETE FROM posts WHERE id = ? AND uid = ?",
      [postID, userInfo.id],
      (err, data) => {
        if (err) return res.json("You can delete only your post!");
        res.json("Post has been deleted");
      }
    );
  });
});

router.put("/:id", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.json("Not authenticated!");
  console.log(req.body);
  jwt.verify(token, process.env.JWT, (err, userInfo) => {
    if (err) return res.json("Token is not valid!");

    const postId = req.params.id;

    db.query(
      "UPDATE posts SET title = ?, desc = ?, img = ?, cat = ? WHERE id = ? AND uid = ?",
      [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        postId,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.json(err);
        res.json("Post has been updated");
      }
    );
  });
});

module.exports = router;
