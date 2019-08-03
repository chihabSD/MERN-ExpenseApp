const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users.controller");
const expenseController = require("../controllers/expense.contoller");

//Auth and signup
router.post("/register", userController.register);
router.post("/login", userController.login);

// Customize and protect the routes
router.all("*", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      const error = new Error("You are not authorized to access this area");
      error.status = 401; // unauthorized error
      throw error; // throw it for the next handler to catch it
    }

    //
    req.user = user;
    return next();
  })(req, res, next);
});

// -------------- Protect Routes -----------//
/**
 * when you want to add passport to a url
 * you have to say : passport.autneticate as middleware and
 * tell the authenticate that i want to use jwt strategy and sesssion
 *
 */
router.get("/profile", userController.profile);
router.post("/expense", expenseController.createExpense);
router.get("/expense", expenseController.get);
router.delete("/expense/:expense_id", expenseController.deleteExpense);
router.put("/expense/:expense_id", expenseController.updateExpense);
module.exports = router;
