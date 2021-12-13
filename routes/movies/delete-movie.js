const express = require("express");
const Router = express.Router();
const MovieModel = require("../../schemas/movie");

Router.delete("/:id", async function (request, response) {
  try {
    const { id } = request.params;
    await MovieModel.findByIdAndDelete(id);
    response.status(204).end();
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
  }
});

module.exports = Router;
