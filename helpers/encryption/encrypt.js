require('dotenv').config()

const bcrypt = require("bcrypt");
const chalk = require("chalk");
const _ = require("lodash");


async function hashManyPasswords(Users){
    _.map(Users, (user) => {
      user.password = bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS))
    });
}



module.exports = {hashManyPasswords};