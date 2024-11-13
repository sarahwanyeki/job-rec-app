const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const addJobValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("salary").notEmpty().withMessage("Salary is required"),
  check("location").notEmpty().withMessage("Location is required"),
  check("companyName").notEmpty().withMessage("Company Name is required"),
  check("companyDescription")
    .notEmpty()
    .withMessage("Company Description is required"),
  check("contactEmail").notEmpty().withMessage("Contact Email is required"),
  check("companyPhone").notEmpty().withMessage("Contact Phone is required"),
];

const idValidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw "Invalid job Id";
    }
  }),
];

module.exports = { addJobValidator, idValidator };
