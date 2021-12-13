const { validationResult } = require("express-validator");

module.exports = function (request, response, next) {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    return response.status(400).json(result.array());
  }

  next();
};
