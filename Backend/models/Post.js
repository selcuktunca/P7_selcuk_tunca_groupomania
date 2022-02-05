'Use Strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    content: {
      type: DataTypes.STRING,
      allowNull: false    
    },
    imagePost: {
      type: DataTypes.STRING,
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.hasMany(models.Comment, {
      foreignKey:{allowNull:false},
      onDelete: "cascade",
      onUpdate: "cascade",
      hooks: true 
    });
    Post.hasMany(models.Like, {
      foreignKey: "id",
      constraints: false,
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  };
  return Post

}


