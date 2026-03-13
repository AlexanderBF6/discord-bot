require("dotenv").config();

const client = require("./bot/client");

const connectDB = require("./database/connect");

const loadCommands = require("./utils/loadCommands");
const loadEvents = require("./utils/loadEvents");

const app = require("./dashboard/server");

connectDB(process.env.MONGO_URI);

loadCommands(client);
loadEvents(client);

client.login(process.env.TOKEN);

app.listen(process.env.PORT, () => {

 console.log("Dashboard activo");

});