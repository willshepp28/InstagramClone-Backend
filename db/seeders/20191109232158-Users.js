'use strict';




module.exports = {
  up: (queryInterface, Sequelize) => {


    
    return queryInterface.bulkInsert("Users", [
      { first_name:"Will" , last_name:"Smith", email: "willsmith@gmail.com", username: "willsmith", password: 123 },
      { first_name: "John", last_name:"Todd", email: "todd@outlook.com", username:"BigMoney_Todd" , password: 555 },
      { first_name: "Sarah", last_name:"McMahan", email: "sarah@gmail.com", username:"i_loveChipotle" , password: 654, }
      
    ])
  },

  down: (queryInterface, Sequelize) => {
  


   return queryInterface.bulkDelete('Users', null, {});
  }
};
