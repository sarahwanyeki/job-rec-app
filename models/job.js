const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    jobType: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: String },
    location: { type: String, required: true },
    companyName: { type: String, required: true },
    companyDescription: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },

    expired: {
      type: Boolean,
      default: false,
    },
    jobPostedOn: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
