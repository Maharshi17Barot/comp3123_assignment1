const express = require("express");
const cros = require("cors");
const UserModel = require("../models/Users");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const secretKey = "maharshi.barot@gbc.ca";

app.use(cros());
app.use(bodyParser.json());

// User Signup :- http://localhost:27017/api/v1/users/signup

// User details

/* Sample user details
{
    "username" : "john doe",
    "email": "john.doe@example.com",
    "password": "plain_text_passoword"
}
*/
app.post("/api/v1/users/signup", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({ user_created: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login :- http://localhost:27017/api/v1/users/login

/* Sample user login Details
{
    "username" : "john doe",
    "password": "plain_text_passoword"
}
*/
app.post("/api/v1/users/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Use a try-catch block for asynchronous password comparison
    try {
      const isMatch = await user.comparePassword(req.body.password);

      if (isMatch) {
        // Create a JWT token with the user's information
        const token = jwt.sign(
          { username: user.username, userId: user._id },
          secretKey
        );

        return res.status(200).json({
          status: true,
          username: user.username,
          token: token, // Send the JWT to the client
          message: "Login successful",
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Invalid username or password",
        });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = app;
