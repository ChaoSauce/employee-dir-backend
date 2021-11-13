const Employee = require('../models/employee');
const { StatusCodes } = require('http-status-codes');

const getAllEmployees = async (req, res) => {
  const { name } = req.query;
  const queryObject = {};

  if (name) {
    queryObject['$or'] = [
      {
        'name.first': {
          $regex: name,
          $options: 'i',
        }
      },
      {
        'name.last': {
          $regex: name,
          $options: 'i',
        }
      }
    ];
  }

  const employees = await Employee.find(queryObject);

  res.status(StatusCodes.OK).json({
    employees,
    count: employees.length,
  });
};

const getEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  const employee = await Employee.findOne({ _id: employeeId });

  if (!employee) {
    throw new NotFoundError(`No job with id ${employeeId}`);
  }

  res.status(StatusCodes.OK).json({ employee });
};

const createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(StatusCodes.CREATED).json({ employee });
};

const updateEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  const employee = await Employee.findByIdAndUpdate(
    { _id: employeeId },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!employee) {
    throw new NotFoundError(`No employee with id ${employeeId}`);
  }

  res.status(StatusCodes.OK).json({ employee });
};

const deleteEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  const employee = await Employee.findOneAndRemove({ _id: employeeId });

  if (!employee) {
    throw new NotFoundError(`No employee with id ${employeeId}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};