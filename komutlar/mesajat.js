const Discord = require('discord.js');
let ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix;
 
 
exports.run = function(client, msg) {

  let mesaj = msg.mentions.members.first();
let msgd = msg.content.substring(3);
if(!mesaj){
  msg.reply('**❌ DM atmam için bir kullanıcı etiketlemelisin.! ['+prefix+'dm Mesaj @Kullanıcı]**');
}if(mesaj){
  if(!msg.member.hasPermissions("ADMISTRATOR")){
    msg.reply('**❌ Yetkiniz yetmiyor..**');
  }else{
    const Embed = new Discord.RichEmbed()
    .setTitle('Bir mesaj')
    .setDescription('Sana bir mesaj geldi;\n'+msgd)
    if(msg.author.id === '691409317714198559'){ //sahip id
      mesaj.send(Embed);
      msg.reply('**Mesaj gönderildi! ✅**');
    }if(msg.author.id === '691409317714198559'){ //sahip id
         mesaj.send(Embed);
      msg.reply('**Mesaj gönderildi! ✅**');
    }
    else{
      msg.reply('**❌Bunu yapamazsınız....**');
    }
  }
}
};
 
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
    kategori: 'sahip',
  permLevel: 4
};

exports.help = {
  name: 'mesaj-at',
  description: 'Belirtilen kişiye dm atar.',
  usage: 'mesaj-at'
};
