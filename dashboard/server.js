const express = require("express");
const session = require("express-session");
const passport = require("./auth/discordStrategy");
const client = require("../bot/client");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
 session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
 })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
 res.send("Dashboard funcionando");
});

app.get(
 "/auth/discord",
 passport.authenticate("discord")
);

app.get(
 "/auth/discord/callback",
 passport.authenticate("discord", { failureRedirect: "/" }),
 (req, res) => {
  res.redirect("/dashboard");
 }
);

app.get("/dashboard", (req, res) => {

 if (!req.user) {
  return res.redirect("/auth/discord");
 }

 if (!client.isReady()) {
  return res.send("El bot aún no está listo.");
 }

 const servers = client.guilds.cache.map(guild => `
 <div style="
 border:1px solid #ccc;
 padding:15px;
 margin:10px;
 width:250px;
 border-radius:10px;
 display:inline-block;
 text-align:center;
 ">
 <h3>${guild.name}</h3>
 <p>${guild.memberCount} miembros</p>
 <a href="/dashboard/${guild.id}">
 <button>Entrar al panel</button>
 </a>
 </div>
 `).join("");

 res.send(`
 <h1>Bienvenido ${req.user.username}</h1>
 <h2>Tus servidores</h2>
 <div>${servers}</div>
 `);

});

app.get("/dashboard/:guildId", (req, res) => {

 const guild = client.guilds.cache.get(req.params.guildId);

 if (!guild) {
  return res.send("Servidor no encontrado");
 }

 const channels = guild.channels.cache
  .filter(c => c.isTextBased())
  .map(c => `<option value="${c.id}">${c.name}</option>`)
  .join("");

 res.send(`
 <h1>Panel de ${guild.name}</h1>

 <h2>Enviar mensaje a canal</h2>

 <form method="POST" action="/send-message">

 <input type="hidden" name="guildId" value="${guild.id}" />

 <label>Canal:</label>
 <select name="channelId">
 ${channels}
 </select>

 <br><br>

 <label>Mensaje:</label>
 <input type="text" name="message" />

 <br><br>

 <button type="submit">Enviar</button>

 </form>

 <hr>

 <h2>Enviar mensaje privado (DM)</h2>

 <form method="POST" action="/send-dm">

 <label>ID del usuario:</label>
 <input type="text" name="userId" />

 <br><br>

 <label>Mensaje:</label>
 <input type="text" name="message" />

 <br><br>

 <button type="submit">Enviar DM</button>

 </form>

 <br>

 <a href="/dashboard">⬅ Volver</a>
 `);

});

app.post("/send-message", async (req, res) => {

 const { channelId, message } = req.body;

 try {

  const channel = await client.channels.fetch(channelId);

  await channel.send(message);

  res.send(`
  <h2>Mensaje enviado correctamente</h2>
  <a href="/dashboard">Volver</a>
  `);

 } catch (error) {

  console.error(error);

  res.send("Error enviando mensaje");

 }

});

app.post("/send-dm", async (req, res) => {

 const { userId, message } = req.body;

 try {

  const user = await client.users.fetch(userId);

  await user.send(message);

  res.send(`
  <h2>Mensaje privado enviado</h2>
  <a href="/dashboard">Volver</a>
  `);

 } catch (error) {

  console.error(error);

  res.send("No se pudo enviar el mensaje");

 }

});

module.exports = app;