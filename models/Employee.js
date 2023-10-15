const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
    lowercase: true,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 50,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    maxlength: 50,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    lowercase: true,
    maxlength: 25,
  },
  salary: {
    type: Number,
    required: true,
    default: 0.0,
    validate(value) {
      if (value < 0.0) throw new Error("Negative Salary aren't real.");
    },
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
