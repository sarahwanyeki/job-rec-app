const isJobSeeker = (req, res, next) => {
  try {
    if (req.user && (req.user.role === 1 || req.user.role === 3)) {
      next();
    } else {
      res.code = 401;
      throw new Error("Permission denied");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isJobSeeker;
