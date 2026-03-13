const xpSystem = require("../systems/leveling/xpSystem");

module.exports = async (client, message) => {

 // ignorar bots
 if (message.author.bot) return;

 // MENSAJES PRIVADOS (DM)
 if (!message.guild) {

  console.log(`DM de ${message.author.username}: ${message.content}`);

  return;

 }

 // MENSAJES EN SERVIDORES (XP)
 xpSystem(message);

};