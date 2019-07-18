const mongoose = require("mongoose");

/**
 * Define the schema
 * the (Schema is found in mongoose)
 */
// use destructuring import to extract schema from mongoose
const { Schema } = mongoose;

// Once we have the Shema from mongoose now we can create an object
const UserSchema = Schema({
  name: { type: String, required: true, index: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joined: { type: Date, default: new Date() }
});

// our model will be the userSchema and the allias is User
const User = mongoose.model("User", UserSchema);

// onece we have it we can export now
module.exports = User;
