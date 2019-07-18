/**
 * Handle the login of signup, login etc
 */
const User = require("../models/user.model"); //Go to models and grab the user.model
const userController = {};

// Signup login
userController.register = async (req, res, next) => {
  /**
   * Creating the new user object
   * I told him that I want to create a new user object so
   * I use destructure(extracting) name, email etc from req.body
   */
  const { name, email, password, joined } = req.body; // extract them from req.body
  // create our new user object
  const newUser = new User({
    // the new User is from User.model
    name,
    email,
    password,
    joined
  });

  //once we have create the new user object we can save him now
  try {
    /**
     * What we are saying here is to save the user  and
     * when it it save please return a user object at (const user)
     */
    const user = await newUser.save();
    return res.send({ user }); // response with the user object
  } catch (e) {
    //customization to the errer
    if (e.code === 11000 && e.name === "MongoError") {
      var error = new Error(`Email address ${newUser.email} is already taken`);
      next(error);
    } else {
      next(e); // this is comming from error handling in the file app.js which handle any error
    }
  }
};

module.exports = userController;
