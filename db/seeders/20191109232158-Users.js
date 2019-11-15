'use strict';

const { hashManyPasswords } = require("../../helpers/encryption/encrypt");

const Users = [
  { email: "willsmith@gmail.com", fullName: "Will Smith", username: "willsmith_theactor", password: "123"},
  { email: "todd@gmail.com", fullName: "Todd Myers", username: "bigmoney_todd", password: "567"},
  { email: "tiffanyhadish@gmail.com", fullName: "Tiffany Hadish", username: "tiff_yafavorite_gurl", password: "654"}
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    hashManyPasswords(Users)
    return queryInterface.bulkInsert("Users", Users)
  },

  down: (queryInterface, Sequelize) => {
  


   return queryInterface.bulkDelete('Users', null, {});
  }
};
