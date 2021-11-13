const express = require('express');
const router = express.Router();

const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee');

router.route('/')
  .get(getAllEmployees)
  .post(createEmployee);

router.route('/:id')
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;