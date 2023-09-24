const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(
      "User already exists. Please login using the registered email and passoword"
    );
  }

  const newUser = await User.create({
    name,
    email,
    password,
    profilePicture,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      token: generateToken(User._id),
    });
  } else {
    res.status(400);
    throw new Error("User registration failed");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});


// /api/user?search=""
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          {
            name: { $regex: req.query.search, $options: "i" },
          },
          {
            email: { $regex: req.query.search, $options: "i" },
          },
        ],
      }
    : {};

  const usersContainingKeyword = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(usersContainingKeyword);
});

module.exports = { registerUser, authUser, allUsers };
