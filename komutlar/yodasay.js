const Discord = require("discord.js");
var yodasay = require('yodasay');
var db = require('quick.db');
exports.run = (client, message, args) => {

		  
		  const embed = new Discord.RichEmbed()
 .setTitle('**Bir mesaj yazman gerekyior**')
    if(!args[0]){
      return message.channel.send(embed)
    }

    
    let text = args.join(" ");

  message.channel.send("```" + yodasay.say({
        text : text
    }) + "```")
  message.react('617413726768988160')

2
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yodasay'],
    kategori: 'eğlence',
  permLevel: 0
};

exports.help = {
  name: 'yoda',
  description: 'İstediğiniz Şeyi yoda Söylermiş Gibi Yazar.',
  usage: 'yodasay [yazı]'
};