import express from "express";
import Author from "./authorsModel.js";
import Article from "../articles/articlesModel.js";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const authors = await Author.findAll({ include: Article });
      res.status(200).send(authors);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const author = await Author.create(req.body);
      res.status(200).send(author);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router.route("/createAll").post(async (req, res, next) => {
  try {
    const data = await Author.bulkCreate(req.body.data);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const author = await Author.findByPk(req.params.id);
      res.status(200).send(author);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const author = await Author.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(200).send({ msgg: "Succesfully edited", author });
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Author.destroy({ where: { id: req.params.id } });
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
