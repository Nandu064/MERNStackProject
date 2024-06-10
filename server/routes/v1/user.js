const express = require("express");
const router = express.Router();
const Users = require("../../controllers/users");
router.get("/get-user-by-id/:id", Users.getUserById);
router.post("/add-user", Users.addUsers);
router.post("/login", Users.login);
router.delete("/delete/:id", Users.deleteUsers);
router.put("/update/:id", Users.updateUser);
module.exports = router;
