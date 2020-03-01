'use strict';

const { User } = require("../models");
const loadPictures = require("../../helpers/seed/post-builder");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

  return User.count().then(totalUsers => {
    return loadPictures(totalUsers).then(posts => {
      console.log(posts);
      return queryInterface.bulkInsert("Posts", posts,{})
    })
  })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
