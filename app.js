const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const applicationRoutes = require("./routes/application");
const morgan = require("morgan");
dotenv.config();
const connectMongodb = require("./init/mongodb");

// init app
const app = express();

// connect database
connectMongodb();
// third-party middleware

app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500", extended: true }));
app.use(morgan("dev"));

// app.use("/api/users", userRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/applications", applicationRoutes);

// module.exports = app;
