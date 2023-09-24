const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db.js");
const router = express.Router();
const verifyToken = require("../verifyToken.js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const moment = require("moment");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
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
  const q = req.query.category
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts";
  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  db.query(
    `SELECT posts.*, username, avatar
    FROM users
    JOIN posts
    ON users.id = posts.uid
    WHERE posts.id = ?`,
    req.params.id,
    (err, data) => {
      if (err) return res.json("Error:" + err);
      res.json(data);
    }
  );
});

router.get("/:postId/comments", (req, res) => {
  db.query(
    `SELECT comments.*, users.username, users.avatar
    FROM comments
    JOIN users
    ON uid = users.id
    WHERE postid = ?`,
    req.params.postId,
    (err, data) => {
      if (err) return res.json("Error:" + err);
      res.json(data);
    }
  );
});

router.post("/:postId/comments", verifyToken, (req, res) => {
  db.query(
    "INSERT INTO comments (comment, date, uid, postid) VALUES (?, ?, ?, ?)",
    [req.body.comment, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), req.user.id, req.params.postId],
    (err, data) => {
      if (err) return res.json("Post comment error:" + err);
      res.status(200).json({ data: data, status: `Comment has been posted...` });
    }
  );
});

router.delete("/:postId/comments/:commentId", verifyToken, (req, res) => {
  db.query("DELETE FROM comments WHERE id = ?", req.params.commentId, (err, data) => {
    if (err) return res.json("Delete comment error: " + err);
    res.json({ data: data, status: `Comment id: ${req.params.commentId} deleted` });
  });
});

// router.post("/upload", upload.single("file"), async (req, res) => {
//   console.log(req.file);
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);

//     // Return the URL of the uploaded image
//     res.json({ imageUrl: result.secure_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error uploading image" });
//   }
// });

router.post("/", verifyToken, upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    db.query(
      "INSERT INTO posts (title, description, img, cat, date, uid) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.body.title,
        req.body.desc,
        result.secure_url,
        req.body.category,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.user.id,
      ],
      (err, data) => {
        if (err) return res.json(err);
        res.json({ data: data, message: "Post has been created"});
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image" });
  }
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
