'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    profile_pic: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    //User has many posts
    User.hasMany(models.Post)
  };
  return User;
};