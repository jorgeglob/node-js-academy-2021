require("dotenv").config(); // Lee las variables de entorno

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("mongoose");
const app = express();
const MovieModel = require("./schemas/movie");
const { body, validationResult } = require("express-validator");

connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(() => console.log("Error al conectar a MongoDB"));

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", function (request, response) {
  response.send("Hello World");
});

// 1. Todas las peliculas
app.get("/getMovies", async function (request, response) {
  try {
    const documents = await MovieModel.find().exec();
    response.json(documents);
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
  }
});

const validations = [
  body("title").notEmpty().withMessage("El titulo es obligatorio"),
];

// 2. Crear una nueva película
app.post("/addMovie", validations, async function (request, response) {
  try {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.status(400).json(result.array());
    }

    const document = new MovieModel(request.body);
    await document.save();
    response.json(document);
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
  }
});

app.listen(8080, function () {
  console.log("> Servidor escuchando el puerto 8080");
});
