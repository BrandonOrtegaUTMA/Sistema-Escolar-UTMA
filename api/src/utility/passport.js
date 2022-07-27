const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy;
const ExtractJWT =  require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const UserModel = require('../models/user');

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: process.env.JWT_SECRET,
}, function(jwt_payload, done) {
    UserModel.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
})); 

passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
    try {
        const userExists = await UserModel.findOne({ "email": email });
        if (userExists) {
            const result = await userExists.isValidPassword(password);
            if(!result){
                return done("Invalid credentials");
            }
            return done(null, userExists)
        }
        return done("User doesn't exist");
    }catch (error) {
        done(error, false);
    }
}));