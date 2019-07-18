/**
 * Handle the login of signup, login etc
 */
const userController = {};

// Signup login
userController.register = (req, res, nex) => {
  res.send({
    message: "sign up"
  });
};

module.exports = userController;
