'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FollowerFollowees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      follower_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      followee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FollowerFollowees');
  }
};