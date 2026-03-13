module.exports = (client) => {

 client.once("clientReady", () => {

  console.log(`Bot conectado como ${client.user.tag}`);

 });

};

