const db = require('quick.db')
const Discord = require('discord.js')
const client = new Discord.Client();
exports.run = async (bot, message, args) => {
const dbengel = require('quick.db')
const i = await dbengel.fetch(`engel_${message.channel.id}`); // \\
    
  if (i == 'acik') return message.reply("Burada Komut Kullanımı Kapalı")
 
  let nesne = args[0]
  if (!nesne) return message.channel.send('Bir kullanıcının IDsini girmelisin?')
  db.delete(`kara_${nesne}`)
        message.channel.sendEmbed(new Discord.RichEmbed().setDescription("Bu Kullanıcı Artık Beyaz Listede").setColor("Black"));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: 'beyazlist',
  description: '[Admin Komutu]',
  usage: 'karaliste <ID>'
};
   