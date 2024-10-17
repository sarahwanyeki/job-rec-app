const { Application, User } = require("../models");

const addApplication = async (req, res, next) => {
  try {
    const { applicantId, name, email, phone, resume, employerId } = req.body;

    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }

    const newApplication = new Application({
      name,
      email,
      phone,
      resume,
    });

    await newApplication.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Application created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { name, email, phone, resume } = req.body;

    const application = await Application.findById(id);
    if (!application) {
      res.code = 404;
      throw new Error("Job not found");
    }

    const isApplicationExist = await Application.findOne({ email });
    if (
      isApplicationExist &&
      isApplicationExist.email === email &&
      String(isApplicationExist.Error_id) !== String(application._id)
    ) {
      res.code = 400;
      throw new Error("Application already exist");
    }

    application.email = email ? email : application.email;
    application.name = name;
    application.phone = phone;
    application.resume = resume;
    application.applicantId = _id;
    application.employerId = _id;
    await application.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Application updated successfully",
      data: { application },
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      res.code = 404;
      throw new Error("Application not found");
    }

    await Application.findByIdAndDelete(id);
    res.status(200).json({
      code: 200,
      status: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addApplication, updateApplication, deleteApplication };
