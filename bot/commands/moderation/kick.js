const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

 data: new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Expulsa un usuario")
  .addUserOption(option =>
   option.setName("usuario").setDescription("Usuario").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

 async execute(interaction) {

  const user = interaction.options.getUser("usuario");

  const member = interaction.guild.members.cache.get(user.id);

  await member.kick();

  interaction.reply(`${user.tag} fue expulsado`);

 }

};