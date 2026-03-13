module.exports = async (client, interaction) => {

 if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

 // comandos slash
 if (interaction.isChatInputCommand()) {

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {

   await command.execute(interaction);

  } catch (error) {

   console.error(error);

   await interaction.reply({
    content: "Error ejecutando comando",
    ephemeral: true
   });

  }

 }

 // botón de ticket
 if (interaction.isButton()) {

  if (interaction.customId === "create_ticket") {

   const channel = await interaction.guild.channels.create({
    name: `ticket-${interaction.user.username}`,
    type: 0,
    permissionOverwrites: [
     {
      id: interaction.guild.id,
      deny: ["ViewChannel"]
     },
     {
      id: interaction.user.id,
      allow: ["ViewChannel"]
     }
    ]
   });

   await interaction.reply({
    content: `Ticket creado: ${channel}`,
    ephemeral: true
   });

  }

 }

};