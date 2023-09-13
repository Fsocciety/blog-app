require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const postsRoutes = require("./routes/posts.js");
const commentsRoutes = require("./routes/comments.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog-frontend-07wc.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json("Hello!");
});

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

process.on("uncaughtException", function (err) {
  console.log(err);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started on port 8080...");
});
