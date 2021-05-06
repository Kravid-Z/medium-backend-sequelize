import express from "express";
import Article from "./articlesModel.js";
import Category from "../categories/categoryModel.js";
import Review from "../reviews/reviewsModel.js";
import Author from "../authors/authorsModel.js";
import User from "../users/usersModel.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const articles = await Article.findAll({
        include: [Category, Review, Author, User],
      });
      res.status(200).send(articles);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const article = await Articles.create(req.body);
      res.status(200).send(article);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router.route("/createAll").post(async (req, res, next) => {
  try {
    const data = await Article.bulkCreate(req.body.data);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const article = await Article.findByPk(req.params.id);
      res.status(200).send(article);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const article = await Article.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(200).send({ msgg: "Succesfully edited", article });
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Article.destroy({ where: { id: req.params.id } });
      if (rows > 0) {
        res.status(204).send();
      } else {
        res.status(404).send("Not found");
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

export default router;
