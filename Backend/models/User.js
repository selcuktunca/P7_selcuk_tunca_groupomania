'Use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    imageProfile : {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: {
        allowNull: false,
        hooks: true
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    User.hasMany(models.Comment, {
      foreignKey: {
        allowNull: false,
        hooks: true
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
    User.hasMany(models.Like, {
      foreignKey: "id",
      onDelete : "cascade",
      onUpdate : "cascade"
    })
  }
  return User

}