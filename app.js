require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');

// Routers
const employeeRouter = require('./routes/employee');

// Routes
app.get('/', (req, res) => {
  res.send('Employee Directory API');
});
app.use('/api/v1/employees', employeeRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();