const express = require("express");
const userRouter = express.Router();
const { signup, login } = require("../controller/UserController");

const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg") cb(null, true);
    else cb(new Error("Only JPEG images are allowed"));
  },
});

userRouter.post("/signup", upload.single("profilepic"), signup);
userRouter.post("/login", login);

module.exports = userRouter;
