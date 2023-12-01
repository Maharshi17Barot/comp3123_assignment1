const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    maxlength: [100, "Username cannot exceed 100 characters."],
    unique: true, // Ensure usernames are unique
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    maxlength: [50, "Password cannot exceed 50 characters."],
  },
  email: {
    type: String,
    maxlength: [50, "Email cannot exceed 50 characters."],
    unique: true, // Ensure email addresses are unique
  },
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return error;
  }
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
