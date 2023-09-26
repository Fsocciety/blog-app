require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts.js");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://blog-frontend-07wc.onrender.com"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json("Hello!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Operations related to posts
 *   - name: Comments
 *     description: Operations related to comments
 */
/**
 * Posts
 * @swagger
 *  paths:
 *    /posts:
 *      get:
 *        tags:
 *          - Posts
 *        summary: Get all posts
 *        parameters:
 *          - in: query
 *            name: category
 *            type: string
 *            description: Get posts by category
 *        responses:
 *          '200':
 *            description: Success
 *      post:
 *        tags:
 *          - Posts
 *        summary: Create post
 *        parameters:
 *          - in: body
 *            name: post
 *            description: Create post
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                img:
 *                  type: string
 *                category:
 *                  type: string
 *                date:
 *                  type: string
 *                id:
 *                  type: integer
 *        responses:
 *          '200':
 *            description: Success
 *    /posts/{id}:
 *       get:
 *        tags:
 *          - Posts
 *        summary: Get post by id
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: Post id
 *        responses:
 *          '200':
 *            description: Success
 *       delete:
 *        tags:
 *          - Posts
 *        summary: Delete post by id
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: Post id
 *        responses:
 *          '200':
 *            description: Success
 *       put:
 *        tags:
 *          - Posts
 *        summary: Update post by id
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: Post id
 *          - in: body
 *            name: post
 *            description: Update post
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                img:
 *                  type: string
 *                category:
 *                  type: string
 *                date:
 *                  type: string
 *                id:
 *                  type: integer
 *        responses:
 *          '200':
 *            description: Success
 */

/**
 * Comments
 * @swagger
 * paths:
 *   /comments:
 *      get:
 *        tags:
 *          - Comments
 *        summary: Get all comments
 *        parameters:
 *          - in: query
 *            name: postid
 *            type: integer
 *            description: Return comments by postid
 *        responses:
 *          '200':
 *            description: Success
 *      post:
 *        tags:
 *          - Comments
 *        summary: Create comment
 *        parameters:
 *          - in: body
 *            name: comment
 *            description: Create comment
 *            schema:
 *              type: object
 *              properties:
 *                comment:
 *                  type: string
 *                date:
 *                  type: string
 *                uid:
 *                  type: integer
 *                postid:
 *                  type: integer
 *        responses:
 *          '200':
 *            description: Success
 *   /comments/{id}:
 *      delete:
 *        tags:
 *          - Comments
 *        summary: Delete comment by id
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: Comment id
 *        responses:
 *          '200':
 *            description: Success
 */

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);

process.on("uncaughtException", function (err) {
  console.log(err);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started on port 8080...");
});
