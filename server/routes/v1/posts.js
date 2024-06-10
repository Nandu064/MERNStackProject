const express = require("express");
const router = express.Router();
const Posts = require("../../controllers/post");
router.get("/get-posts-by-user_id/:id", Posts.getAllPosts);
router.post("/add-post", Posts.addPost);
router.post("/edit-post/:id", Posts.editPost);
router.delete("/delete-post/:id", Posts.deletePost);
router.post("/:postId/comment", Posts.addComment);
router.post("/:postId/like", Posts.likeAPost);
router.post("/:postId/dislike", Posts.dislike);

module.exports = router;
