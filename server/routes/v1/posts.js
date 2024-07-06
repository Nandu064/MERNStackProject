const express = require("express");
const router = express.Router();
const Posts = require("../../controllers/post");
router.get("/get-posts", Posts.getAllPosts);
router.get("/get-post/:post_id", Posts.getPost);
router.post("/add-post", Posts.addPost);
router.post("/edit-post/:id", Posts.editPost);
router.delete("/delete-post/:id", Posts.deletePost);
router.post("/:postId/comment", Posts.addComment);
router.post("/:postId/like", Posts.likeAPost);
router.post("/:postId/dislike", Posts.dislike);

module.exports = router;
