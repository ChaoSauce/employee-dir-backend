const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  gender: {
    type: String,
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
    enum: ['Accounting', 'Engineering', 'HR', 'Sales', 'Other'],
    default: 'Other',
  },
  title: {
    type: String,
    enum: ['Mr.', 'Mrs', 'Ms.', 'Mrs.', 'Jr.', 'Sr.'],
    default: '',
  },
  // TODO: let users upload images but will require somewhere to host. For now we'll use what is provided by the randomuser.me API
  picture: {
    large: {
      type: String,
      default: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    medium: {
      type: String,
      default: 'https://randomuser.me/api/portraits/med/men/1.jpg'
    },
    thumbnail: {
      type: String,
      default: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
    }
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);