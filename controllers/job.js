const Job = require("../models/job");

const createJob = async (req, res) => {
  try {
    const { title, description, company, location } = req.body;
    const newJob = new Job({
      title,
      description,
      company,
      location,
      userId: req.user.id,
    });
    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob, getJobs };
