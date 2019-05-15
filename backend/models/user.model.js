const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs')  // to encrypt passwor
const jwt = require('jsonwebtoken');


var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'Full name can\'t be empty'
  },
  email: {
    type: String,
    required: 'email can\'t be empty',
    unique: true
  },
  password: {
    type: String,
    required: 'password can\'t be empty',
    minlength: [4, 'Password must be atleast 4 character long']
  },
  saltSecret: String
});


//custom validation for email
userSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val)
}, 'invalid email');


// pre event for encrypting
userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = salt;
      this.saltSecret = salt;
      next();
    })
  })
})


// methods password imported from passportconfig
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);    // password is normal plaine  n this.password is encrypted
};


userSchema.methods.generateJwt = function(){
  // for payload
  return jwt.sign({_id: this._id},
    // save this in config.json
    process.env.JWT_SECRET)
    {
      expiresIn: process.env.JWT_EXP
    }
}



// import it in db.js
mongoose.model('User', userSchema);


