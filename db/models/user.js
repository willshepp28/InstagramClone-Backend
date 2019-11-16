'use strict';
const { hashPassword } = require("../../helpers/encryption/encrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    profile_pic: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await hashPassword(user.password)
      }
    }
  });

 
  User.associate = function(models) {
    // associations can be defined here
    //User has many posts
    User.hasMany(models.Post)
  };
  return User;
};