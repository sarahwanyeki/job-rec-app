const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: Number, default: 3 }, // role 1 -> admin, role 2 -> Employer, role 3 -> Job Seeker
    verificationCode: String,
    forgotPasswordCode: String,
    isVerified: { type: Boolean, default: false },
    profilePic: { type: mongoose.Types.ObjectId, ref: "file" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
