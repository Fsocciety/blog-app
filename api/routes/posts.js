const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db.js");
const router = express.Router();
const verifyToken = require("../verifyToken.js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "damcyrnce",
  api_key: "886898234196177",
  api_secret: "hc5YaPv_9GclzG1lHalF4hDdzr0",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  console.log("radi");
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

router.post("/", verifyToken, upload.single("file"), (req, res) => {
  console.log(req.body);
  cloudinary.uploader.upload(req.file.path).then((result) => {
    db.query(
      "INSERT INTO posts (title, description, img, cat, date, uid) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.body.title,
        req.body.desc,
        result.url,
        req.body.category,
        req.body.date,
        req.user.id,
      ],
      (err, data) => {
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
