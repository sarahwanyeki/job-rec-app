const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const addJobValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("category").notEmpty().withMessage("Category is required"),
  check("company").notEmpty().withMessage("Company is required"),
  check("location").notEmpty().withMessage("Location is required"),
  check("fixedSalary")
    .notEmpty()
    .withMessage("Salary must contain at least 4 digits "),
  check("salaryFrom")
    .notEmpty()
    .withMessage("Salary must contain at least 4 digits "),
  check("salaryTo").notEmpty().withMessage("Salary cannot exceed 9 digits "),
];

const idValidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw "Invalid category Id";
    }
  }),
];

module.exports = { addJobValidator, idValidator };
