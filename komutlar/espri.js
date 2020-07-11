 const Discord = require('discord.js');
const { get } = require('snekfetch');

exports.run = async (client, message) => {



const espri = await get('https://api.emirkabal.com/espri').set('Authorization', '5-q9yc1alvs0a6h-cttntypyt2jnzzn--v5swe8xjl0i-2zefgn0-7w449q2rmtv');
  if (!espri || !espri.body || !espri.body.mesaj) return console.log("Hata oluştu,Lütfen API anahtarınızı kontrol ediniz.");

	    const ayarlar = require('../ayarlar.json')
const DBL = require('dblapi.js')
const dbl = new DBL(ayarlar.dbltkn, client) 
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
		  
  message.channel.send(espri.body.mesaj)



} else {
        message.channel.send("Bu komutu kullanabilmek için 12 saatte bir https://top.gg/bot/691423981223411753/vote sitesinden bota oy vermeniz gerekmektedir. Onaylanması birkaç dakika sürebilir, lütfen bekleyin.").then(msg => 	msg.delete(5000))
      }
  })

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['espiri', 'espri-yap'],
  permLevel: 0
};

exports.help = {
  name: 'espri',
  description: 'Espri yapar.',
  usage: 'espri'
};