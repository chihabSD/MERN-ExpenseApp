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

userController.login = async (req, res, next) => {
  //user will send username and password
  const { email, password } = req.body;
  try {
    // we check these these fields
    const user = await User.findOne({ email }); // if there a user with that email store him in user variables
    if (!user) {
      // if there is no user
      const err = new Error(`The email ${email} was not found`);
      err.status = 401;
      next(err);
    }
    /**
     * argument 1 : what has user passed thourgh reg.body
     * argument 2: the password that is found in the DB user.password
     * argument 3: the call back
     */
    user.isPasswordMatch(password, user.password, (err, matched) => {
      // if password matched
      if (matched) {
        return res.send({ message: " You can login " });
      }
      res.status(401).send({
        error: "Invalid username/password combination"
      });
    });
    // check if password is correct but the password is hashed so go to user.model
  } catch (e) {
    next(e);
  }
  // if they are ok then we create jwt and return it
};
module.exports = userController;
