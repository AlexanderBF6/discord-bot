const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

 data: new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Borra mensajes")
  .addIntegerOption(option =>
   option.setName("cantidad").setDescription("Número").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

 async execute(interaction) {

  const amount = interaction.options.getInteger("cantidad");

  await interaction.channel.bulkDelete(amount);

  interaction.reply({ content: "Mensajes borrados", ephemeral: true });

 }

};