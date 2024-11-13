const { Job, User } = require("../models");

const addJob = async (req, res, next) => {
  try {
    const {
      jobType,
      title,
      description,
      salary,
      location,
      companyName,
      companyDescription,
      contactEmail,
      contactPhone,
      expired,
      jobPostedOn,
    } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    const newJob = new Job({
      jobType,
      title,
      description,
      salary,
      location,
      companyName,
      companyDescription,
      contactEmail,
      contactPhone,
      expired,
      jobPostedOn,
      postedBy: _id,
    });
    await newJob.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "Job created successfully" });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const {
      jobType,
      title,
      description,
      salary,
      location,
      companyName,
      companyDescription,
      contactEmail,
      contactPhone,
      expired,
      jobPostedOn,
    } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      res.code = 404;
      throw new Error("Job not found");
    }

    const isJobExist = await Job.findOne({ title });
    if (
      isJobExist &&
      isJobExist.title === title &&
      String(isJobExist._id) !== String(job._id)
    ) {
      res.code = 400;
      throw new Error("Job already exist");
    }

    job.jobType = jobType;
    job.title = title ? title : job.title;
    job.description = description;
    job.salary = salary;
    job.location = location;
    job.companyName = companyName;
    job.companyDescription = companyDescription;
    job.contactEmail = contactEmail;
    job.contactPhone = contactPhone;

    job.expired = expired;
    job.jobPostedOn = jobPostedOn;
    job.postedBy = _id;
    await job.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Job updated successfully",
      data: { job },
    });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      res.code = 404;
      throw new Error("Job not found");
    }

    await Job.findByIdAndDelete(id);
    res
      .status(200)
      .json({ code: 200, status: true, message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// const getJobs = async (req, res, next) => {
//   try {
//     const { q, size, page } = req.query;
//     let query = {};

//     // convert size and page to int
//     const sizeNumber = parseInt(size) || 3;
//     const pageNumber = parseInt(page) || 1;

//     if (q) {
//       const search = RegExp(q, "i");

//       query = { $or: [{ title: search }, { location: search }] };
//     }

//     const total = await Job.countDocuments({ query });
//     const pages = Math.ceil(total / sizeNumber);
//     const jobs = await Job.find(query)
//       .skip((pageNumber - 1) * sizeNumber)
//       .limit(sizeNumber)
//       .sort({ updatedBy: -1 });

//     res.status(200).json({
//       code: 200,
//       status: true,
//       message: "Get job list successfully",
//       data: { jobs, total, pages },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getJobs = async (req, res, next) => {
  try {
    const { q, size, page } = req.query;
    let query = {};

    // Convert size and page to integers
    const sizeNumber = parseInt(size) || 3;
    const pageNumber = parseInt(page) || 1;

    if (q) {
      const search = RegExp(q, "i");
      query = { $or: [{ title: search }, { location: search }] };
    }

    // Use query directly without wrapping it in another object
    const total = await Job.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const jobs = await Job.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ updatedBy: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get job list successfully",
      data: { jobs, total, pages },
    });
  } catch (error) {
    next(error);
  }
};

const getJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      res.code = 404;
      throw new Error("Job not found");
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get job successfully",
      data: { job },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { addJob, updateJob, deleteJob, getJobs, getJob };
