const express = require("express");
const jwt = require("jsonwebtoken");
const client = require("../db.js");
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
  console.log(req.query.category)
  const q = req.query.category
    ? "SELECT * FROM posts WHERE category = $1"
    : "SELECT * FROM posts";
  client.query(q, [req.query.category], (err, result) => {
    if (err) return res.json(""+ err);
    res.json(result.rows);
  });
});

router.get("/:id", (req, res) => {
  const q = `SELECT posts.*, username, avatar
    FROM users
    JOIN posts
    ON users.id = posts.uid
    WHERE posts.id = $1`;
  const values = [req.params.id];

  client.query(q, values, (err, result) => {
      if (err) return res.json(err);
      console.log('result')
      res.json(result.rows);
    }
  );
});

router.get("/:postId/comments", (req, res) => {
  client.query(
    `SELECT comments.*, users.username, users.avatar
    FROM comments
    JOIN users
    ON uid = users.id
    WHERE postid = $1`,
    [req.params.postId],
    (err, result) => {
      if (err) return res.json("Error:" + err);
      res.json(result.rows);
    }
  );
});

router.post("/:postId/comments", verifyToken, (req, res) => {
  client.query(
    "INSERT INTO comments (comment, date, uid, postid) VALUES ($1, $2, $3, $4)",
    [req.body.comment, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), req.user.id, req.params.postId],
    (err, result) => {
      if (err) return res.json("Post comment error:" + err);
      res.status(200).json({ data: result, status: `Comment has been posted...` });
    }
  );
});

router.delete("/:postId/comments/:commentId", verifyToken, (req, res) => {
  client.query("DELETE FROM comments WHERE id = ?", req.params.commentId, (err, result) => {
    if (err) return res.json("Delete comment error: " + err);
    res.json({ result: result, status: `Comment id: ${req.params.commentId} deleted` });
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
    const image = await cloudinary.uploader.upload(req.file.path);
    client.query(
      "INSERT INTO posts (title, description, img, cat, date, uid) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        req.body.title,
        req.body.desc,
        image.secure_url,
        req.body.category,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.user.id,
      ],
      (err, result) => {
        if (err) return res.json(err);
        res.json({ data: result, message: "Post has been created"});
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
    client.query(
      "DELETE FROM posts WHERE id = $1 AND uid = $2",
      [postID, userInfo.id],
      (err, result) => {
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

    client.query(
      "UPDATE posts SET title = $1, desc = $2, img = $3, cat = $4 WHERE id = $5 AND uid = $6",
      [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        postId,
        userInfo.id,
      ],
      (err, result) => {
        if (err) return res.json(err);
        res.json("Post has been updated");
      }
    );
  });
});

module.exports = router;
