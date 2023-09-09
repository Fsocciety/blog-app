require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const postsRoutes = require("./routes/posts.js");
const usersRoutes = require("./routes/users.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

process.on("uncaughtException", function (err) {
  console.log(err);
});

app.listen(8080, () => {
  console.log("Server started on port 8080...");
});
