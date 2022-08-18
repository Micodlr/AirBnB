const { validationResult } = require("express-validator");
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    const errParamAndMsg = {};
    const errors = validationErrors
      .array()
      .forEach((error) => (errParamAndMsg[error.param] = error.msg));

    const err = Error("Validation error");
    err.errors = errParamAndMsg;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
