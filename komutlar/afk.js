const db = require("quick.db")

exports.run = async (client, message, args) => {
	    let kullanıcı = await db.fetch(`gold_${message.author.id}`);


  var USER = message.author;
  var REASON = args.slice(0).join("  ");
  if(!REASON) return message.channel.send("AFK olmak için bir sebep belirtin.").then(message => message.delete(7000));
  
  db.set(`afk_${USER.id}`, REASON);
  db.set(`afk_süre_${USER.id}`, Date.now());
  message.channel.send("Başarıyla AFK moduna girdiniz.").then(message => message.delete(7000));
  message.delete(2000);
 
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  kategori: "genel",
  permLevel: 0 
};

exports.help = {
  name: 'afk', 
  description: 'Kullanıcııyı afk moduna sokar.',
  usage: 'afk <sebep>'
};