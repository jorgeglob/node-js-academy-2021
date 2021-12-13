require("dotenv").config(); // Lee las variables de entorno

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("mongoose");
const app = express();
const moviesRouter = require("./routes/movies");

/*
  REST API:

  1. Usar los verbos de HTTP adecuadamente

  2. La transmisión de datos sea JSON/XML

  3. Usar los códigos de respuesta de HTTP adecuadamente

  4. Usar pronombres (en plural) en lugar de verbos

  getMovies -> movies (GET)
  addMovie -> movies (POST)

  5. Expresar las relaciones de las entidades en la URL

  /movies/:id/actors

  6. Las peticiones contengan todo lo necesario para ser ejecutados (es decir, que no haya un estado)
*/

connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(() => console.log("Error al conectar a MongoDB"));

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/peliculas", moviesRouter);

app.listen(8080, function () {
  console.log("> Servidor escuchando el puerto 8080");
});
