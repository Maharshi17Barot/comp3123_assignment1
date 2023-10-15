// Import required modules and packages
const express = require("express");
const userRouter = require("./routes/UserRoutes");
const employeeRouter = require("./routes/EmployeeRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Create an Express application
const app = express();
const SERVER_PORT = 27017;

// Configure middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the employee and user routers for handling routes
app.use(employeeRouter);
app.use(userRouter);

// MongoDB Atlas connection string
const DB_CONNECTION_STRING =
  "mongodb+srv://rootadmin:password1706@cluster0.4ncm9ei.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority";

// Connect to MongoDB Atlas using Mongoose
mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Error: " + err);
    process.exit();
  });

// Define a basic route to provide a welcome message
app.route("/").get((req, res) => {
  res.send("<h1>Comp3123-Assignment 1</h1>");
});

// Start the Express server on the specified port
app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
