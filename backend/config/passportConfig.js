// passport acts as middleaew
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// mongoose model
var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
// when we cal authenitication from passport this arrow func will be called inside this func e need to verify credentials email,passwor is valid or not
    (username, password, done) => {
// User from mongoose model
        User.findOne({ email: username},
            (err, user) => {
                if(err)
                return done(err);
                // unknown user
                else if (!user)
                  return done(null, false, { message: 'email is not registered' });
                  // wrong password
                  else if (!user.verifyPassword(password))
                    return done(null, false, { message: 'wrong passwword' });
                    // authentication succeeded
                    else
                      return done(null, user);
                // define this verified function in User schema     
            })
    })
)