const Discord = require("discord.js");
var cowsay = require("cowsay");
const db = require('quick.db');
exports.run = async(client, message, args) => {

        const embed = new Discord.RichEmbed()
 .setTitle('**Bir mesaj yazman gerekyior**')
    if(!args[0]){
      return message.channel.send(embed)
    }


    let text = args.join(" ");
message.channel.send("```" + cowsay.say({
        text : text
    }) + "```")
	  

	  
	 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: 'eğlence',
  permLevel: 0
};

exports.help = {
  name: 'cowsay',
  description: 'İstediğiniz Şeyi İnek Söylermiş Gibi Yazar.',
  usage: 'cowsay [yazı]'
};