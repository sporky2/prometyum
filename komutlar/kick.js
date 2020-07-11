const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  

  
  if (!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) return message.reply('Gerekli izniniz bulunmuyor')

  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
 if (db.has(`log_${message.guild.id}`) === false) return message.reply('Mod log kanalı ayarlanmamış');
  let modlog = message.guild.channels.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.size < 1) return message.reply('Lütfen kicklemek istediğiniz kullanıcıyı etiketleyin');
  if (reason.length < 1) return message.reply('Kickleme sebebinizi giriniz');
  if (user.id === message.author.id) return message.reply('Kendini kickleyeceğine kendin çıksana?');

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('İşlem', 'KİCK')
  .addField('Kicklenen üye/tag', `${user.tag} (${user.id})`)
  .addField('Kickleyen yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Kick sebebi', "```" + reason + "```")
  modlog.send(embed);
  
  message.guild.member(user).kick();
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`Üye başarıyla kicklendi`)
  message.channel.send(embed2)
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kick'],
  permLevel: 2,
    kategori: "moderasyon",
 
};

exports.help = {
  name: 'at',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'at <@kullanıcı> <sebep>',
 
};