// import data from Db
const mongoose = require('mongoose');
const passport = require('passport');
const_ = require('lodash')

const User = mongoose.model('User');

// define function for user registration
module.exports.register = (req,res,next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if(!err)
    res.send(doc);
   else
    {
      if (err.code == 11000)
        res.status(422).send(['duplicate email address found'])
        else
          return next(err);
          // we can handle err msgs globally in app.js file
    }
  });
}

// exporting user credentials
module.exports.authenticate = (req, res, next) => {
  // call for passport authentication it authenticates the user in passportConfig file 
   passport.authenticate("local",(err, user, info) => {
     // error from passport middleware
     if (err) return res.status(400).json(err);
     // registered user call jsw token
     else if (user) return res.status(200).json({ "token": user.generateJwt()});
     // unknown user or wrong password
     else return res.status(404).json(info);
     // add routing for authenticate in route file
   })(req, res)
}

module.exports.userProfile = (req, res, next) => {   // add route to this
  User.findOne({_id: req._id}),
    (err, user) => {
      if (!user)
        return res.status(404).json({ status: false, message:'user record not found'});
      else     // lodash is used to pick only fullName n email
        return res. status(200).json({status: true, user: _.pick(user,['fullName','email'])});
    }
}

