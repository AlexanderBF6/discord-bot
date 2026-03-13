const { SlashCommandBuilder } = require("discord.js");

module.exports = {

 data: new SlashCommandBuilder()
  .setName("marcos")
  .setDescription("Mensaje especial para Marcos"),

 async execute(interaction) {

  await interaction.reply(
   "Marcos deja de ligar con ingenieras"
  );

 }

};