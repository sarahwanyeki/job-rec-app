const express = require("express");
const router = express.Router();

const { jobController } = require("../controllers");
const { addJobValidator, idValidator } = require("../validators/job");

const validate = require("../validators/validate");

const isAuth = require("../middlewares/isAuth");
const isEmployer = require("../middlewares/isEmployer");

router.post(
  "/",
  isAuth,
  isEmployer,
  idValidator,
  validate,
  addJobValidator,
  jobController.addJob
);

router.put(
  "/:id",
  isAuth,
  isEmployer,
  idValidator,
  validate,
  jobController.updateJob
);

router.delete(
  "/:id",
  isAuth,
  isEmployer,
  idValidator,
  validate,
  jobController.deleteJob
);

router.get("/", isAuth, jobController.getJobs);

router.get("/:id", isAuth, idValidator, validate, jobController.getJob);
// module exports
module.exports = router;
