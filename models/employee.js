const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Please provide gender'],
  },
  name: {
    first: {
      type: String,
      required: [true, 'Please provide first name'],
    },
    last: {
      type: String,
      required: [true, 'Please provide last name'],
    },
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email'
    ],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  department: {
    type: String,
    required: [true, 'Please provide department'],
    enum: ['Accounting', 'Engineering', 'HR', 'Sales', 'Other'],
    default: 'Other',
  },
  title: {
    type: String,
    enum: ['Mr.', 'Mrs', 'Ms.', 'Mrs.', 'Jr.', 'Sr.', ''],
  },
  // TODO: let users upload images but will require somewhere to host. For now we'll use a temp image
  picture: {
    large: {
      type: String,
      default: 'https://img.icons8.com/ultraviolet/80/000000/test-account.png'
    },
    medium: {
      type: String,
      default: 'https://img.icons8.com/ultraviolet/80/000000/test-account.png'
    },
    thumbnail: {
      type: String,
      default: 'https://img.icons8.com/ultraviolet/80/000000/test-account.png'
    }
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);