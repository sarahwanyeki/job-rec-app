const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const addApplicationValidator = [
  // check("applicantId").notEmpty().withMessage("Employer ID is required"),
  check("name").notEmpty().withMessage("Applicant's name is required"),
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("phone"),
  check("resume"),
  // check("employerId"),
];

const idValidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw "Invalid category Id";
    }
  }),
];

module.exports = {
  addApplicationValidator,
  idValidator,
};
