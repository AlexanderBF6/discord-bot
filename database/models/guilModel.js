const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({

 guildId: String,

 prefix: {
  type: String,
  default: "!"
 },

 logChannel: String,

 modRole: String

});

module.exports = mongoose.model("Guild", guildSchema);