const express = require("express");
const { connection} = require("./Config/db");
const { logger } = require("./Middleware/logger");
const {userRoute} = require("./Controllers/UserRoute")
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(userRoute)
app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log("Connected to MongoDb Database");
    } catch (error) {
      console.log(error.message);
      console.log("Database not Connected");
    }
    console.log(`Server is running at port ${process.env.PORT}`);
  })