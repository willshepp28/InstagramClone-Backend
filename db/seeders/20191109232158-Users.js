'use strict';

const bcrypt = require("bcrypt");
require('dotenv').config()

console.log(process.env.SALT_ROUNDS)
module.exports = {
  up: (queryInterface, Sequelize) => {


    
    return queryInterface.bulkInsert("Users", [
      { first_name:"Will" , last_name:"Smith", email: "willsmith@gmail.com", username: "willsmith", password: bcrypt.hashSync("123", parseInt(process.env.SALT_ROUNDS)) },
      { first_name: "John", last_name:"Todd", email: "todd@outlook.com", username:"BigMoney_Todd" , password: bcrypt.hashSync("555", parseInt(process.env.SALT_ROUNDS))},
      { first_name: "Sarah", last_name:"McMahan", email: "sarah@gmail.com", username:"i_loveChipotle" , password: bcrypt.hashSync("654", parseInt(process.env.SALT_ROUNDS)) }
      
    ])
  },

  down: (queryInterface, Sequelize) => {
  


   return queryInterface.bulkDelete('Users', null, {});
  }
};
