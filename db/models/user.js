'use strict';
// const bcrypt = require("bcrypt");
// require('dotenv').config()

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    profile_pic: DataTypes.STRING
  }, {
    // hooks: {
    //   afterValidate: (user) => {
    //     user.password = bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS))
    //   }
    // }
  });

 
  User.associate = function(models) {
    // associations can be defined here
    //User has many posts
    User.hasMany(models.Post)
  };
  return User;
};