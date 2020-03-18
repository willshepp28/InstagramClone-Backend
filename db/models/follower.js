'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    request_accepted: DataTypes.BOOLEAN
  }, {});
  Follower.associate = function(models) {
    // associations can be defined here
    Follower.belongsTo(models.User, { foreignKey: 'user_id'})
    Follower.belongsTo(models.User, { foreignKey: 'follower_id'})
  };
  return Follower;
};