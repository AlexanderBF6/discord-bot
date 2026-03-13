const mongoose = require("mongoose");

const warningSchema = new mongoose.Schema({

 userId: String,
 guildId: String,
 reason: String,
 moderator: String,
 date: Date

});

module.exports = mongoose.model("Warning", warningSchema);