const { body } = require("express-validator");

const validateSignup = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name is required and must be at least 3 characters"),
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateSignin = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password is required"),
];

const validateJobCreation = [
  body("title").isString().withMessage("Job title is required"),
  body("description").isString().withMessage("Job description is required"),
  body("company").isString().withMessage("Company name is required"),
  body("location").isString().withMessage("Job location is required"),
];

const validateApplication = [
  body("jobId").notEmpty().withMessage("Job ID is required"),
  body("resume").notEmpty().withMessage("Resume is required"),
];

module.exports = {
  validateSignup,
  validateSignin,
  validateJobCreation,
  validateApplication,
};
