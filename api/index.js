require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const postsRoutes = require("./routes/posts.js");
const usersRoutes = require("./routes/users.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/uploads", upload.single("file"), function (req, res) {
  res.json(req.file.originalname);
});

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

app.listen(8080, () => {
  console.log("Server started on port 8080...");
});
