require('dotenv').config();
require('express-async-errors');

// Security
const helmet = require('helmet');
const cors = require('cors');

const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');

// Routers
const employeeRouter = require('./routes/employee');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Employee Directory API');
});
app.use('/api/v1/employees', employeeRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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