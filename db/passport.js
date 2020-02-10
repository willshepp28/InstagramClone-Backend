require("dotenv").config()

const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../sequelize");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// const BCYPT_SALT_ROUNDS = process.env.BCYPT_SALT_ROUNDS;


// passport.use("register", new localStrategy({
//     username: "username",
//     password: "password",
//     session: false
// }, (username, password, done) => {
    
// }))
