const express = require("express");
const router = express.Router();
const PostSchema = require("../models/post");
const UserSchema = require("../models/user");

exports.addPost = async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    const newPost = new PostSchema(req.body).save();
    res.status(200).json({ message: "Post added successfully" });
  } catch (error) {
    console.log("addpost error: ", error);
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await PostSchema.find().populate({
    path: "user_id",
    select: "-password",
  });
  res.status(200).json(posts);
};
exports.getPost = async (req, res) => {
  const { post_id } = req.params;

  const posts = await PostSchema.findOne({ _id: post_id });
  res.status(200).json(posts);
};
exports.editPost = async (req, res) => {
  const { id } = req.params;
  // *console.log("id: ", id);
  // *console.log("req.body: ", req.body);
  const postUpdate = await PostSchema.findByIdAndUpdate(id, req.body);
  res.status(200).json({ message: "Post updated successfully" });
};
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const deletePost = await PostSchema.findByIdAndDelete(id);
  res.status(200).json({ message: "Post deleted successfully" });
};
exports.addComment = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostSchema.findById({});
    post.comments.push(req.body);
    await post.save();
    res.status(200).json({ message: "Commented successfully" });
  } catch (error) {
    // *console.log("comment error: ", error);
  }
};

exports.likeAPost = async (req, res) => {
  const { postId } = req.params;
  const { user_id } = req.body;
  // *console.log("user_id: ", user_id);
  const user = await UserSchema.findById(user_id);
  // *console.log("user: ", user);
  //   if (user.likedPosts.includes(postId)) {
  //     return res.status(400).json({ error: "Post already liked by this user" });
  //   }
  user.likedPosts.push(postId);
  user.save();
  const post = await PostSchema.findByIdAndUpdate(
    postId,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.status(200).json({ message: "Liked successfully" });
};

exports.dislike = async (req, res) => {
  const { postId } = req.params;
  const { user_id } = req.body;
  const user = await UserSchema.findById(user_id);
  //   if (user.disLikedPosts.includes(postId)) {
  //     return res.status(400).json({ error: "Post already liked by this user" });
  //   }
  user.disLikedPosts.push(postId);
  user.save();
  const post = await PostSchema.findByIdAndUpdate(
    postId,
    { $inc: { dislikes: 1 } },
    { new: true }
  );
  res.status(200).json({ message: "disLiked successfully" });
};
