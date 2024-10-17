const express = require("express");
const router = express.Router();

const { applicationController } = require("../controllers");
const {
  addApplicationValidator,
  idValidator,
} = require("../validators/application");

const validate = require("../validators/validate");

const isAuth = require("../middlewares/isAuth");
const isJobSeeker = require("../middlewares/isJobSeeker");

router.post(
  "/",
  isAuth,
  isJobSeeker,
  idValidator,
  validate,
  addApplicationValidator,
  applicationController.addApplication
);

router.put(
  "/:id",
  isAuth,
  isJobSeeker,
  idValidator,
  validate,
  applicationController.updateApplication
);

router.delete(
  "/:id",
  isAuth,
  isJobSeeker,
  idValidator,
  validate,
  applicationController.deleteApplication
);

module.exports = router;
