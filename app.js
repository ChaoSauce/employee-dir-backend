require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Employee Directory API');
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();