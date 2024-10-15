const express = require("express");
const { createJob, getJobs } = require("../controllers/job");
const { validateJobCreation } = require("../middlewares/validate");
const { validationResult } = require("express-validator");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateJobCreation,
  validationResult,
  createJob
);
router.get("/", authMiddleware, getJobs);

module.exports = router;
