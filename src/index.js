import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import services from "./services/index.js";
import db from "./db/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", services);

const port = process.env.PORT || 5000;

db.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(
      "\u001b[" + 35 + "m" + "Server is running on port: " + port + "\u001b[0m"
    );
  });
  console.table(listEndpoints(app));
  app.on("error", (error) =>
    console.info(" ❌ Server is not running due to : ", error)
  );
});
