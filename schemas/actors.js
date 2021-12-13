const { Schema, model } = require("mongoose");

const ActorSchema = new Schema({
  name: { type: String },
});

module.exports = model("actors", ActorSchema);
