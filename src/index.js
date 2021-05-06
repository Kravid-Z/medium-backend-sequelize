import express from "express"
import cors from "cors"
import services from "./services/index.js"
import db from "./db/index.js"


const app = express()

app.use(cors());
app.use(express.json());
app.use("/api", services);
const port = process.env.PORT || 5000;

db.sequelize.sync({force:true}).then(() => {
    app.listen(port, () => console.log("server is running: " + port));
    app.on("error", (error) =>
      console.info(" ❌ Server is not running due to : ", error)
    );
  });