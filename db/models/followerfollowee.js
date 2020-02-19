'use strict';
module.exports = (sequelize, DataTypes) => {
  const FollowerFollowee = sequelize.define('FollowerFollowee', {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    followee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    }
  }, {});
  FollowerFollowee.associate = function(models) {
    // associations can be defined here
    FollowerFollowee.belongsTo(models.User);
  };
  return FollowerFollowee;
};