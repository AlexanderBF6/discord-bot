const Level = require("../../../database/models/levelModel");

const cooldown = new Set();

module.exports = async (message) => {

 if (!message.guild) return;
 if (message.author.bot) return;
 if (message.content.startsWith("/")) return;

 const userId = message.author.id;

 if (cooldown.has(userId)) return;

 cooldown.add(userId);

 setTimeout(() => {
  cooldown.delete(userId);
 }, 30000);

 const xpGain = Math.floor(Math.random() * 10) + 5;

 let user = await Level.findOne({
  userId: message.author.id,
  guildId: message.guild.id
 });

 if (!user) {
  user = new Level({
   userId: message.author.id,
   guildId: message.guild.id
  });
 }

 user.xp += xpGain;

 const xpNeeded = 100 * Math.pow(user.level + 1, 1.5);

 if (user.xp >= xpNeeded) {

  user.level += 1;

  message.channel.send(
   `${message.author} subió al nivel ${user.level}!`
  );

 }

 await user.save();

};