const express = require("express");
const router = express.Router();
const followController = require("../../controllers/follow"); // Adjust the path to your follow controller

router.post("/follow/:user_id", followController.followUser);
router.post("/unfollow/:user_id", followController.unfollowUser);
router.post("/getUserFollowers/:userId", followController.getuserFollowers);
router.post("/getUserFollowing/:userId", followController.getuserFollowing);

module.exports = router;
