const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const authorize = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(authorize, allUsers);
router.post("/login", authUser);

module.exports = router;
