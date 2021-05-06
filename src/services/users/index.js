import express from "express";
import User from "./usersModel.js";
import Review from "../reviews/reviewsModel.js";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({ include: Review });
      res.status(200).send(users);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.status(200).send(user);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router.route("/createAll").post(async (req, res, next) => {
  try {
    const data = await User.bulkCreate(req.body.data);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      res.status(200).send(user);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const user = await User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.status(200).send({ msgg: "Succesfully edited", user });
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await User.destroy({ where: { id: req.params.id } });
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
