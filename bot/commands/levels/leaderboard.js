const { SlashCommandBuilder } = require("discord.js");
const Level = require("../../../database/models/levelModel");

module.exports = {

 data: new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("Ranking del servidor"),

 async execute(interaction) {

  const users = await Level.find({
   guildId: interaction.guild.id
  })
   .sort({ xp: -1 })
   .limit(10);

  let leaderboard = users
   .map((u, i) => `#${i + 1} <@${u.userId}> — ${u.xp} XP`)
   .join("\n");

  await interaction.reply(leaderboard);

 }

};