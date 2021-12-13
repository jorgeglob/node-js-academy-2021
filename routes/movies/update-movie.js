const express = require("express");
const Router = express.Router();
const genres = require("../../config/genres");
const validationMiddleware = require("../../middlewares/validation");
const { body } = require("express-validator");
const MovieModel = require("../../schemas/movie");

const validationsUpdate = [
  body("genre")
    .exists()
    .optional()
    .isIn(genres)
    .withMessage(
      "El genero debe ser cualquiera de los siguientes valores: " +
        genres.join(", ")
    ),
  body("duration")
    .exists()
    .optional()
    .isInt({ min: 1 })
    .withMessage("La duración debe ser un entero positivo"),
  body("year")
    .exists()
    .optional()
    .isInt({ min: 1888 })
    .withMessage("El año debe ser mayor a 1888"),
  validationMiddleware,
];

Router.patch("/:id", validationsUpdate, async function (request, response) {
  try {
    const { id } = request.params;
    const { body } = request;
    const document = await MovieModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    response.json(document);
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
  }
});

module.exports = Router;
