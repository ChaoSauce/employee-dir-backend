const Employee = require('../models/employee');
const { StatusCodes } = require('http-status-codes');

const getAllEmployees = async (req, res) => {
  const { name, sort, fields } = req.query;
  const queryObject = {};

  // Search name in either name.first or name.last property
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

  let result = Employee.find(queryObject);

  // Sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('name.first');
  }

  // Fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const employees = await result;

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