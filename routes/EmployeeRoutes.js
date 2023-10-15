const express = require("express");
const EmployeeModel = require("../models/Employee");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//Get all employees
app.get("/api/v1/emp/employees", async (req, res) => {
  const employees = await EmployeeModel.find({});

  try {
    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Create new employee
app.post("/api/v1/emp/employees", async (req, res) => {
  const employees = new EmployeeModel(req.body);

  try {
    await employees.save();
    res.status(201).send({
      employee_created: employees,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// User can get employee details by employee id
app.get("/api/v1/emp/employees/:eid", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.eid);
    res.status(200).send({ get_employee: employee });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
});

// User can update employee details by employee id
app.put("/api/v1/emp/employees/:eid", async (req, res) => {
  try {
    const updateResult = await EmployeeModel.updateOne(
      { _id: req.params.eid },
      req.body
    );

    if (updateResult.nModified > 0) {
      res.status(200).send({ message: "Employee updated successfully" });
    } else {
      res
        .status(404)
        .send({ message: "Employee not found or no changes made" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// User can delete employee details by employee id
app.delete("/api/v1/emp/employees/:eid", async (req, res) => {
  try {
    const deleteResult = await EmployeeModel.deleteOne({ _id: req.params.eid });
    if (deleteResult.deletedCount > 0) {
      res.status(204).send({ message: "Employee deleted successfully" });
    } else {
      res.status(404).send({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
