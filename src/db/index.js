import { Sequelize, DataTypes } from "sequelize";
import Author from "../services/authors/authorsModel.js";
import Article from "../services/articles/articlesModel.js";
import Review from "../services/reviews/reviewsModel.js";
import Category from "../services/categories/categoryModel.js";
import User from "../services/users/usersModel.js";

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  { port: process.env.PGPORT, host: process.env.PGHOST, dialect: "postgres" }
);

Author.hasMany(Articles);

const models = {
  Author: Author(Sequelize, DataTypes),
  Article: Article(Sequelize, DataTypes),
  Review: Review(Sequelize, DataTypes),
  Category: Category(Sequelize, DataTypes),
  User: User(Sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log(e));

export default { sequelize, models };
