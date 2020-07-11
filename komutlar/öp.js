const Discord = require('discord.js'); 
const db = require('quick.db')

exports.run = async(client, message , args) => {

const ayarlar = require('../ayarlar.json')
const DBL = require('dblapi.js')
const dbl = new DBL(ayarlar.dbltkn, client) 
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
		  
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.channel.send('Kimi öpeceksin?');
	const embed = new Discord.RichEmbed()
	.setAuthor (' ')
	.setColor (`ORANGE`)
	.setDescription( message.author.username+` adlı kullanıcı, ${mesaj} adlı kullanıcıyı öptü.` )
	
	.setImage(`https://i.kym-cdn.com/photos/images/original/000/986/968/2f5.gif`)
  return message.channel.sendEmbed(embed);
  message.react('617413726768988160')



} else {
        message.channel.send("Bu komutu kullanabilmek için 12 saatte bir https://top.gg/bot/691423981223411753/vote sitesinden bota oy vermeniz gerekmektedir. Onaylanması birkaç dakika sürebilir, lütfen bekleyin.").then(msg => 	msg.delete(3000))
      }
  })
  
  
};
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
  kategori: 'eğlence',
	permLevel: 0
};

exports.help = {
	name: 'öp',
	description: 'İstediğiniz kişiyi öpersiniz.',
	usage: 'öp'
};