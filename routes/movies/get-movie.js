const express = require("express");
const Router = express.Router();
const MovieModel = require("../../schemas/movie");

Router.get("/", async function (request, response) {
  try {
    const documents = await MovieModel.find()
      .populate(["protagonist", "actors"])
      .exec();
    response.json(documents);
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
  }
});

module.exports = Router;
