
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
 
exports.run = (client, message, params) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("#36393F")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(':warning: Uyarı :warning:', '`sunucuresmi` adlı komutu özel mesajlarda kullanamazsın.')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const codare = new Discord.RichEmbed()
    .setAuthor(message.guild.name)
  .setColor("#36393F")
    .setTimestamp()
    .setDescription('')
        .setImage(`${message.guild.iconURL} `)
    return message.channel.sendEmbed(codare);
    }
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu-pp', 'servericon', 'server-icon', 'sunucupp', 'sunucuresmi'],
  permLevel: 0
};
 
exports.help = {
  name: 'sunucuresmi',
  description: 'Sunucu Resminin Linkini Atar.',
  usage: 'sunucuresmi'
};