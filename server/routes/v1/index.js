const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/post", require("./posts"));
router.use("/follow", require("./follow"));
module.exports = router;
