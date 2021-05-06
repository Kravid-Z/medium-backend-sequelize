import express from "express";
import Review from "./reviewsModel.js";
import User from "../users/usersModel.js";
const router = express.Router();

router;
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll({ include: User });
      res.status(200).send(reviews);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const review = await Review.create(req.body);
      res.status(200).send(review);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const review = await Review.findByPk(req.params.id);
      res.status(200).send(review);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const review = await Review.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(200).send({ msgg: "Succesfully edited", review });
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Review.destroy({ where: { id: req.params.id } });
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
