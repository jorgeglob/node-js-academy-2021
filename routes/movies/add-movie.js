const express = require("express");
const Router = express.Router();
const genres = require("../../config/genres");
const validationMiddleware = require("../../middlewares/validation");
const { body } = require("express-validator");
const MovieModel = require("../../schemas/movie");

const validationsCreate = [
  body("title").notEmpty().withMessage("El titulo es obligatorio"),
  body("genre").notEmpty().withMessage("El genero es obligatorio"),
  body("genre")
    .isIn(genres)
    .withMessage(
      "El genero debe ser cualquiera de los siguientes valores: " +
        genres.join(", ")
    ),
  body("duration").notEmpty().withMessage("La duración es obligatoria"),
  body("duration")
    .isInt({ min: 1 })
    .withMessage("La duración debe ser un entero positivo"),
  body("year").notEmpty().withMessage("El año es obligatorio"),
  body("year").isInt({ min: 1888 }).withMessage("El año debe ser mayor a 1888"),
  body("director").notEmpty().withMessage("El director es obligatorio"),
  body("actors").notEmpty().withMessage("La lista de actores es obligatoria"),
  validationMiddleware,
];

Router.post("/", validationsCreate, async function (request, response) {
  try {
    const document = new MovieModel(request.body);
    await document.save();
    response.status(201).json(document);
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
  }
});

module.exports = Router;
