export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      headLine: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      subHead: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
  );
  Article.associate = (models) =>{
    Article.belongsTo(models.Author)
    Article.belongsTo(models.Category)
    Article.hasMany(models.Review)
  }
  return Article;
};
