const express = require("express");
const router = express.Router();
const UserSchema = require("../models/user");

const bcrypt = require("bcrypt");
const salt = process.env.password_salt;

exports.addUsers = async (req, res) => {
  console.log("req.body: ", req.body);
  const { username, password, email } = req.body;
  let data = {
    username,
    email,
    password,
  };
  bcrypt.hash(req.body.password, salt, async function (err, hash) {
    if (!err) {
      data.password = hash;
      const existingUser = await UserSchema.find({ username });
      if (existingUser.length > 0) {
        res.status(500).json({ message: "Username already taken" });
      } else {
        let doc = new UserSchema(data).save();
        res.status(200).json({ message: "User registered successfully" });
      }
    } else {
      res.status(500).json(err.message);
    }
  });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  const doc = await UserSchema.find({ _id: id }, { password: 0 });
  if (doc) res.status(200).json(doc[0]);
  else res.status(500).json({ message: "No User found" });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("username: ", username.trim());
    const existingUser = await UserSchema.find({ username });
    console.log("existingUser: ", existingUser);
    if (!(existingUser.length > 0)) {
      res.status(404).json({ message: "User not found" });
    } else {
      bcrypt.compare(
        password,
        existingUser[0]?.password,
        function (err, result) {
          if (result) {
            console.log("existingUser[0]", existingUser[0]);
            existingUser[0].password = "";
            res.status(200).json(existingUser?.[0]);
          } else {
            res.status(500).json({ message: "Password does not match" });
          }
        }
      );
    }
  } catch (error) {
    console.log("loginUser error", error);
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted user successfully" });
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await UserSchema.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("error: ", error);
  }
};
