const { request, response } = require("express");
const { isMongoId } = require("../helpers/mongo-id");
const {
  validateEmail,
  validatePassword,
} = require("../utils/regex-validations");

const validateCreateUser = (req = request, res = response, next) => {
  const { email = null, password = null } = req.body;
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({
      ok: false,
      msg: "password or email has incorrect format",
    });
  }
  next();
};

const validateLogin = (req = request, res = response, next) => {
  const { email = null, password = null } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide email and password",
    });
  }
  next();
};

const validateResource = (req = request, res = response, next) => {
  const validOptions = ["subscription", "read", "saved"];
  const option = req.params.option || null;
  if (!validOptions.includes(option)) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide a valid option",
    });
  }
  const resourceID = req.params.id;
  if (!resourceID || !isMongoId(resourceID)) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide a valid resource id",
    });
  }
  next();
};

module.exports = {
  validateCreateUser,
  validateLogin,
  validateResource,
};