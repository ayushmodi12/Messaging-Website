const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("/").post(auth, accessChat);
// router.route("/").get(auth, fetchChats);
// router.route("/group").post(auth, createGroupChat);
// router.route("/renamegroup").put(auth, renameGroupChat);
// router.route("/addtogroup").put(auth, addToGroupChat);
// router.route("/removefromgroup").delete(auth, removeUserFromGroupChat);

module.exports = router;
