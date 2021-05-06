import express from "express";
import authorsRoute from "./authors/index.js";
import usersRoute from "./users/index.js";
import articlesRoute from "./articles/index.js";
import reviewsRoute from "./reviews/index.js";
import categoriesRoute from "./categories/index.js";

const route = express.Router();

route.use("/users", usersRoute);
route.use("/authors", authorsRoute);
route.use("/articles", articlesRoute);
route.use("/reviews", reviewsRoute);
route.use("/categories", categoriesRoute);

export default route;
