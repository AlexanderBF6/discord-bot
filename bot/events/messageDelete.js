module.exports = async (client, message) => {

 if (!message.guild) return;

 const logChannel = message.guild.channels.cache.find(
  c => c.name === "logs"
 );

 if (!logChannel) return;

 logChannel.send(
  `Mensaje eliminado de ${message.author}: ${message.content}`
 );

};