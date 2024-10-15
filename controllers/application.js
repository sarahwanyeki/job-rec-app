const Application = require("../models/application");

const applyForJob = async (req, res) => {
  try {
    const { jobId, resume } = req.body;
    const newApplication = new Application({
      jobId,
      userId: req.user.id,
      resume,
    });
    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user.id,
    }).populate("jobId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyForJob, getApplications };
