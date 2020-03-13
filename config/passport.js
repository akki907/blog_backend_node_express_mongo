const jwtStatergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = require('./../models/User')
const setting = require('./setting');




module.exports = passport => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = setting.secret;
    passport.use(
        new jwtStatergy(opts, (jwt_payload, done) => {
            User.findOne({_id: jwt_payload._id}, function(err, user) {
                if (err) return done(err, false);
                if (!user)  return done(null, false);
                return done(null, {_id:user._id,username:user.username,email:user.email,avatar:user.avatar});
            });

        })

    )
}