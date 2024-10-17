const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },

    resume: { type: String, required: true }, // URL or path to the resume
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
