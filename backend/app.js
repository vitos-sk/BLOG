require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const {
  register,
  login,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("./controllers/user");

const {
  getPosts,
  addPost,
  editPost,
  deletePost,
  getPost,
} = require("./controllers/post");

const { addComment, deleteComment } = require("./controllers/comment");
const mapUser = require("./helpers/mapUser");
const mapPost = require("./helpers/mapPost");
const mapComment = require("./helpers/mapComment");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/role");

const PORT = process.env.PORT || 3100;
const app = express();

// ==================== MIDDLEWARES ====================
app.use(express.json());
app.use(cookieParser());

// ==================== PUBLIC API ROUTES ====================
app.post("/api/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res.cookie("token", token, { httpOnly: true }).send({
      error: null,
      user: mapUser(user),
    });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res.cookie("token", token, { httpOnly: true }).send({
      error: null,
      user: mapUser(user),
    });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.post("/api/logout", async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true }).send({ error: null });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const { posts, lastPage } = await getPosts(search, page, limit);

    res.send({
      error: null,
      data: { lastPage, posts: posts.map(mapPost) },
    });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await getPost(req.params.id);
    res.send({ error: null, data: mapPost(post) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

// ==================== PROTECTED API ROUTES ====================
app.use("/api", authenticated);

app.post("/api/posts/:id/comments", async (req, res) => {
  try {
    const newComment = await addComment(req.params.id, {
      content: req.body.content,
      author: req.user._id,
    });
    res.send({ error: null, data: mapComment(newComment) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.delete(
  "/api/posts/:postId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    try {
      await deleteComment(req.params.postId, req.params.commentId);
      res.send({ error: null });
    } catch (error) {
      res.send({ error: error.message || "Unknown error" });
    }
  }
);

app.post("/api/posts", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newPost = await addPost({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    });
    res.send({ error: null, data: mapPost(newPost) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.patch("/api/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const updatedPost = await editPost(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    });
    res.send({ error: null, data: mapPost(updatedPost) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.delete("/api/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.send({ error: null });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.get("/api/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers();
    res.send({ error: null, data: users.map(mapUser) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.get("/api/users/roles", hasRole([ROLES.ADMIN]), (req, res) => {
  try {
    const roles = getRoles();
    res.send({ error: null, data: roles });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.patch("/api/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, {
      role: req.body.roleId,
    });
    res.send({ error: null, user: mapUser(updatedUser) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.delete("/api/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.send({ error: null });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

// ==================== FRONTEND ====================
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// ==================== START SERVER ====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
