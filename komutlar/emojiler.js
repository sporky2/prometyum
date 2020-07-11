const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

 
exports.run = (client, msg, args) => {
         let mesaj = args.slice(0).join(' ')
		 const prefix = ':'
 
 
 
 
  if(mesaj === "id") {
     const emojiList = msg.guild.emojis.map((e, x) => (x + ' | ' + e)).join('\n');
      var emojis = msg.guild.emojis.array();
    if (emojiList.length > 2000) return msg.reply("fazla emoji var")
  const embed2 = new Discord.RichEmbed()
.setColor("RED")
  .setFooter(`Sadece emojileri görmek için ${prefix}emojiler`)
.setDescription(`\`\`\`js
Sunucuda Bulunan Emojiler (${emojis.length} adet)
${emojiList}
\`\`\``)
             .setTimestamp()
 msg.channel.send(embed2);
        return
  }
          msg.reply("Sunucuda Bulunan Emojiler" + msg.guild.emojis.map(emoji => emoji).join(' | '))
         const embed = new Discord.RichEmbed()
            .setDescription(`Emojiler Yukarıda :D`)
            .setColor('RED')
            .setTimestamp()
          .setFooter(`Emojileri IDleri ile birlikte görmek için; ${prefix}emojiler id`)
        msg.channel.send(embed)
 
 
}
 
 
 
exports.conf = {
    enabled: true,
    guildOnly: true,
  aliases: ["emoji"],
  permLevel: 0,
  }
 
exports.help = {
    name: 'emojiler',
    description: 'Sunucuda bulunan emojileri gösterir.',
    usage: 'emojiler'
}