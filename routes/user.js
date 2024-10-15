const express = require("express");
const { signup, signin } = require("../controllers/user");
const { validateSignup, validateSignin } = require("../middlewares/validate");
const { validationResult } = require("express-validator");

const router = express.Router();

router.post("/signup", validateSignup, validationResult, signup);
router.post("/signin", validateSignin, validationResult, signin);

module.exports = router;
