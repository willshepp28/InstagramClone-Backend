'use strict';

const { User } = require("../models");
const createFollowers = require("../../helpers/seed/follower-builder");

/**
 * 
 * Assign 5 followers for each users
 * 
 * 
 * 1. Figure out how many users are in the database
 * 2. Using Pagination each user should be assigned 5 users,
 *  EXAMPLE: user 1 should be assigned user 2 through 5
 * 
 * 
 * 
 * CAVEAT
 * - users should not follow themselves
 */

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
      return createFollowers(totalUsers).then((followers) => {
        return queryInterface.bulkInsert("Followers", followers,{})
      })
    });
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
