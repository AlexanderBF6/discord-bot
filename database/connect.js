const mongoose = require("mongoose");

async function connectDB(uri) {

 try {

   await mongoose.connect(uri);

   console.log("MongoDB conectado");

 } catch (error) {

   console.error(error);

 }

}

module.exports = connectDB;