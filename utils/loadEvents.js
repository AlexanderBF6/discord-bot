const fs = require("fs");
const path = require("path");

module.exports = (client) => {

 const eventsPath = path.join(__dirname, "../bot/events");

 const files = fs.readdirSync(eventsPath);

 for (const file of files) {

  const event = require(`${eventsPath}/${file}`);

  const eventName = file.split(".")[0];

  client.on(eventName, (...args) => event(client, ...args));

 }

};