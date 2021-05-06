export default (sequelize, DataTypes) => {
    const Category = sequelize.define(
      "category",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        categoryName: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
    );
    Category.associate = (models) =>{
        Category.hasMany(models.Articles)
    }
    return Category;
  };