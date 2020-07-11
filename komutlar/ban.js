const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {

  const db = require('quick.db');
  

    
  if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.reply('Gerekli izin yok')
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  if (db.has(`log_${message.guild.id}`) === false) return message.reply('Mod log kanalı ayarlanmamış');
  let modlog = message.guild.channels.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.size < 1) return message.reply('Lütfen banlamak istediğiniz üyeyi etiketleyin');
  if (reason.length < 1) return message.reply('Lütfen sebep giriniz');
  if (user.id === message.author.id) return message.reply('Kendinimi banlayacaksın?');

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('İşlem', 'Ban')
  .addField('Banlanan üye', `${user.tag} (${user.id})`)
  .addField('Banlayan yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Ban sebebi', "```" + reason + "```")
  modlog.send(embed);
  user.send(`\`${message.guild.name}\` Adlı Sunucuda yaptığınız olumsuz davranışlardan dolayı yasaklandınız\nYetkilinin girdiği sebep: \`${reason}\``)
  message.guild.ban(user, 2);
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
    .setDescription(`Başarıyla banlandı`)
  message.channel.send(embed2)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban','yasakla','banla'],
  permLevel: 3,
  kategori: "moderasyon",
};

exports.help = {
  name: 'yasakla',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};