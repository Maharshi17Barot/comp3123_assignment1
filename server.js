const express = require("express");
const userRouter = require("./routes/UserRoutes");
const employeeRouter = require("./routes/EmployeeRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const SERVER_PORT = 27017;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(employeeRouter);
app.use(userRouter);

const DB_CONNECTION_STRING =
  "mongodb+srv://rootadmin:password1706@cluster0.4ncm9ei.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority";

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

app.route("/").get((req, res) => {
  res.send("<h1>MogoDB + Mongoose Example</h1>");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
