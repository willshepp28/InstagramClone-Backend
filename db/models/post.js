'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    user_id: {
      type: DataTypes.INTEGER
    },
    photo: DataTypes.STRING,
    caption: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: 'user_id'})
  };
  return Post;
};