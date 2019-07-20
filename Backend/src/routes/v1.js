const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users.controller");

//Auth and signup
router.post("/register", userController.register);
router.post("/login", userController.login);

/**
 * when you want to add passport to a url
 * you have to say : passport.autneticate as middleware and
 * tell the authenticate that i want to use jwt strategy and sesssion
 *
 */
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    return res.send({
      message: " You are authenticated "
    });
  }
);
module.exports = router;
