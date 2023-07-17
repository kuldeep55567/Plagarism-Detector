const express = require("express");
const { UserModel } = require("../Model/Usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleWare} = require("../Middleware/authenticate");
require("dotenv").config()
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const check = await UserModel.find({ email });
    if (check.length > 0) {
      return res.status(200).json({ "ok": false, "msg": "User already exist" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      try {
        const data = new UserModel({ name, email, password: hash});
        await data.save();
        res.status(200).json({ "ok": true, "msg": "Registered Successfully" });
  
      } catch (error) {
        res.status(400).json({ "ok": false, "msg": error.message });
      }
  
    });
  })
  
  userRoute.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: "User with this email not found", ok: false })
      }
      const isPasswordSame = await bcrypt.compare(password, user.password)
      if (!isPasswordSame) {
        return res.status(401).json({ msg: "Invalid email or password", ok: false })
      }
      const token = jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '1hr' })
      const response = {
        "ok": true,
        "msg": "Login Successfull",
        "token": token
      }
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({ "ok": false, "msg": error.message });
    }
  })
  module.exports ={userRoute}