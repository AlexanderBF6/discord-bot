const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

 data: new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Banea un usuario")
  .addUserOption(option =>
   option.setName("usuario").setDescription("Usuario").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

 async execute(interaction) {

  const user = interaction.options.getUser("usuario");

  const member = interaction.guild.members.cache.get(user.id);

  if (!member) return interaction.reply("Usuario no encontrado.");

  await member.ban();

  interaction.reply(`${user.tag} fue baneado`);

 }

};