const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const connectMongodb = require("./init/mongodb");
const {
  authRoute,
  jobRoute,
  fileRoute,
  applicationRoute,
} = require("./routes");
const { errorHandler } = require("./middlewares");
const notfound = require("./controllers/notfound");

// init app
const app = express();

// connect database
connectMongodb();

// third-party middleware

app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500", extended: true }));
app.use(morgan("dev"));

// route section
app.use("/api/users", authRoute);
// app.use("/api/v1/category", categoryRoute);
app.use("/api/file", fileRoute);
app.use("/api/job", jobRoute);

// not found route
app.use("*", notfound);

// error handling middleware
app.use(errorHandler);

module.exports = app;
