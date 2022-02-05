'Use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

  });
  Like.associate = (models) => {
    Like.belongsTo(models.User);
    Like.belongsTo(models.Post);
  };
  return Like;
};

