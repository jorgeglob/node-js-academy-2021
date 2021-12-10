require("dotenv").config();
const { connect } = require("mongoose");
const MovieModel = require("./schemas/movie");

connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(() => console.log("Error al conectar a MongoDB"));

const movies = [
  {
    title: "La Isla Siniestra",
    director: "Martin Scorsese",
    year: 2010,
    genre: "Suspenso",
    actors: ["Leonardo DiCaprio", "Mark Ruffalo"],
    duration: 138,
  },
  {
    title: "Gladiador",
    year: 2000,
    genre: "Acción",
    director: "Ridley Scott",
    actors: ["Russell Crowe", "Joaquin Phoenix"],
    duration: 155,
  },
];

async function seed() {
  for (let movie of movies) {
    await new MovieModel(movie).save();
  }

  process.exit(0);
}

seed();
