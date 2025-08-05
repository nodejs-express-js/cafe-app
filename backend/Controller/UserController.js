const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const { uploadToS3, getPresignedUrl } = require("../Middlware/awsS3");

require("dotenv").config();

const EXPIRATION_TIME = 60 * 60 * 24 * parseInt(process.env.EXPIRY_TIME || "1");

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

const signup = async (req, res) => {
  try {
    let { email, password, timezone } = req.body;

    if (!email || !password || !timezone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include lowercase, uppercase, number, and symbol",
      });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let profilepicKey = "";

    if (req.file) {
      try {
        const key = `profilepics/${uuidv4()}.jpg`;
        await uploadToS3(req.file.buffer, key, req.file.mimetype);
        profilepicKey = key;
      } catch (s3Err) {
        console.error("S3 Upload Failed:", s3Err.message);
        profilepicKey = "";
      }
    }

    const hashedPassword = await encryptPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      timezone,
      profilepic: profilepicKey,
    });

    let profileUrl = "";
    if (profilepicKey) {
      try {
        profileUrl = await getPresignedUrl(profilepicKey, EXPIRATION_TIME);
      } catch (err) {
        console.error("Presigned URL Error:", err.message);
        profileUrl = "";
      }
    }

    const token = await generateToken(user.id);

    res.status(201).json({
      message: "Signup successful",
      email: user.email,
      profilepic: profileUrl,
      token,
      timezone: user.timezone,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let profileUrl = "";
    if (user.profilepic) {
      try {
        profileUrl = await getPresignedUrl(user.profilepic, EXPIRATION_TIME);
      } catch (err) {
        console.error("Presigned URL Error:", err.message);
        profileUrl = "";
      }
    }

    const token = await generateToken(user.id);

    res.status(200).json({
      message: "Login successful",
      email: user.email,
      profilepic: profileUrl,
      token,
      timezone: user.timezone,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

module.exports = { signup, login };
