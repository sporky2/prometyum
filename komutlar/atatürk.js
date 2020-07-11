const Discord = require('discord.js');
const { get } = require('snekfetch');

exports.run = async (client, message) => {
  const atatürk = await get('https://api.emirkabal.com/ataturk').set('Authorization', '5-q9yc1alvs0a6h-cttntypyt2jnzzn--v5swe8xjl0i-2zefgn0-7w449q2rmtv');
  if (!atatürk || !atatürk.body || !atatürk.body.mesaj) return console.log("Hata oluştu,Lütfen API anahtarınızı kontrol ediniz.");
  const embed = new Discord.RichEmbed()
    .setColor('GREEN')
    .setImage(atatürk.body.mesaj)
    .setTimestamp()
    message.channel.send({embed})
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['espiri', 'atatürk-yap'],
  permLevel: 0
};

exports.help = {
  name: 'atatürk',
  description: 'atatürk yapar.',
  usage: 'atatürk'
};