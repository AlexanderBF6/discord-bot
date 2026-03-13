const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {

 data: new SlashCommandBuilder()
  .setName("ticket")
  .setDescription("Crear panel de tickets"),

 async execute(interaction) {

  const button = new ButtonBuilder()
   .setCustomId("create_ticket")
   .setLabel("Abrir Ticket")
   .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(button);

  interaction.reply({
   content: "Soporte",
   components: [row]
  });

 }

};