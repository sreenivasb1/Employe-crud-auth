const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
  console.log('connected to database');
})
.catch(() => {
  console.log('connection failed');
})

module.exports = mongoose;

require('./user.model');
