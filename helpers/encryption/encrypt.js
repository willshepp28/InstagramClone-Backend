require('dotenv').config()

const bcrypt = require("bcrypt");
const chalk = require("chalk");
const _ = require("lodash");


async function hashManyPasswords(Users){
    _.map(Users, (user) => {
      hashPassword(user.password).then((hash) => {
          user.password = hash;
        })
    });
};

async function hashPassword(password){
  return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
}

async function comparePasswordtoHash(password){
  return bcrypt.compareSync(password, hash)
}



module.exports = {hashManyPasswords};