app.get("/api/guilds", async (req,res)=>{

 const guilds = client.guilds.cache.map(g=>({

  id:g.id,
  name:g.name

 }))

 res.json(guilds)

})