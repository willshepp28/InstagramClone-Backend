'use strict';
require('dotenv').config()

const { hashManyPasswords } = require("../../helpers/encryption/encrypt");
const {getUsers} = require("../../helpers/seed/user-builder");



module.exports = {
  up: (queryInterface, Sequelize) => {
    return getUsers().then(users => {
      return hashManyPasswords(users).then(() => {
        return queryInterface.bulkInsert("Users", users);
      }) 
    })
  },

  down: (queryInterface, Sequelize) => {
  


   return queryInterface.bulkDelete('Users', null, {});
  }
};
