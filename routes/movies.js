const getMovieRouter = require("./movies/get-movie");
const addMovieRouter = require("./movies/add-movie");
const updateMovieRouter = require("./movies/update-movie");
const replaceMovieRouter = require("./movies/replace-movie");
const deleteMovieRouter = require("./movies/delete-movie");
const express = require("express");
const Router = express.Router();

Router.use(getMovieRouter)
  .use(addMovieRouter)
  .use(updateMovieRouter)
  .use(replaceMovieRouter)
  .use(deleteMovieRouter);

module.exports = Router;
