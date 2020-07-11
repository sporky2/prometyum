const Discord = require('discord.js');

exports.run = (client, message, args) => {
    

let mention = message.mentions.users.first();
let sender = "";

if (message.channel.guild.member(message.author).nickname == null) {
  sender = message.author.username;
} else {
  sender = message.channel.guild.member(message.author).nickname;
}

if (mention != null || mention != undefined) {
  var name = mention.username + "'s ";
  if (mention.username.endsWith("s")) {
    name = mention.username + "' ";
  }
  const avatarEmbedOther = new Discord.RichEmbed()
  .setAuthor(mention.username, mention.avatarURL)
  .setColor('RED')
  .setImage(mention.avatarURL)
  .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL)
 // .setDescription(`[Avatarın büyük halini göster!](${message.author.avatarURL})`);
  message.channel.sendEmbed(avatarEmbedOther);
  
  return;
} else {
  const avatarEmbedYou = new Discord.RichEmbed()
  .setAuthor(sender, message.author.avatarURL)
  .setColor('RED')
  .setImage(message.author.avatarURL)
  .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL)
  //.setDescription(`[Avatarın büyük halini göster!](${message.author.avatarURL})`);
  message.channel.sendEmbed(avatarEmbedYou);

  return;
}
message.channel.sendMessage("Render hatası yada bilinmeyen bir hata oldu.");

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['avatarım',"pp"],
  kategori: "genel",
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Avatarınızı gösterir ve ya birini etiketlerseniz o kişinin avatarını gösterir.',
  usage: 'avatar <@kullanıcı>'
};