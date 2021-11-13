const Employee = require('../models/employee');
const { StatusCodes } = require('http-status-codes');

const getAllEmployees = async (req, res) => {
  res.send('get all employees');
};

const getEmployee = async (req, res) => {
  res.send('get employee');
};

const createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(StatusCodes.CREATED).json({ employee });
};

const updateEmployee = async (req, res) => {
  res.send('update employee');
};

const deleteEmployee = async (req, res) => {
  res.send('delete employee');
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};