const mongoose = require("mongoose");
const Follow = require("../models/follow"); // Adjust the path to your follow model
const User = require("../models/user"); // Adjust the path to your user model

exports.followUser = async (req, res) => {
  const { user_id } = req.params;
  console.log("user_id: ", user_id);
  const { userIdToFollow } = req.body;
  console.log("userIdToFollow: ", userIdToFollow);

  try {
    const user = await User.findById(user_id);
    const userToFollow = await User.findById(userIdToFollow);

    if (!user || !userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({
      follower: user_id,
      followee: userIdToFollow,
    });

    if (existingFollow) {
      return res.status(400).json({ error: "Already following this user" });
    }

    // Create a new follow relationship
    const newFollow = new Follow({
      follower: user_id,
      followee: userIdToFollow,
    });

    await newFollow.save();

    res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.unfollowUser = async (req, res) => {
  const { user_id } = req.params;
  const { userIdToUnfollow } = req.body;

  try {
    const user = await User.findById(user_id);
    const userToUnfollow = await User.findById(userIdToUnfollow);

    if (!user || !userToUnfollow) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find and delete the follow relationship
    const deletedFollow = await Follow.findOneAndDelete({
      follower: user_id,
      followee: userIdToUnfollow,
    });

    if (!deletedFollow) {
      return res.status(400).json({ error: "Not following this user" });
    }

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getuserFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId: ", userId);
    const followers = await Follow.find({ followee: userId })
      .populate("follower", "username name email")
      .select("-followee");
    res.status(200).json(followers);
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getuserFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId: ", userId);
    const following = await Follow.find({ follower: userId })
      .populate("followee", "username name email")
      .select("-follower");
    res.status(200).json(following);
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
