export default (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
  );
  Review.associate = (models) =>{
    Review.belongsTo(models.User)
    Review.belongsTo(models.Article)
  }
  return Review;
};
