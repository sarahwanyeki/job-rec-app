const validateExtension = (ext) => {
  if (
    ext === ".jpg" ||
    ext === ".jpeg" ||
    ext === ".png" ||
    ext === ".PNG" ||
    ext === ".pdf" ||
    ext === ".PDF"
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = { validateExtension };
