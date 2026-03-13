const { SlashCommandBuilder } = require("discord.js");
const Level = require("../../../database/models/levelModel");

module.exports = {

 data: new SlashCommandBuilder()
  .setName("rank")
  .setDescription("Muestra tu nivel"),

 async execute(interaction) {

  const user = await Level.findOne({
   userId: interaction.user.id,
   guildId: interaction.guild.id
  });

  if (!user) {
   return interaction.reply("No tienes XP todavía.");
  }

  await interaction.reply(
   `Nivel: ${user.level}\nXP: ${user.xp}`
  );

 }

};