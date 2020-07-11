const Discord = require('discord.js');
const client = new Discord.Client();
const { stripIndents } = require('common-tags');
exports.run = async (client, message) => {
  
  const db = require('quick.db');
  let args = message.content.split(' ').slice(1);
  const hata = args.slice(0).join(' ');
  if (hata.length < 1) return message.reply('Lütfen hatayı bildiriniz')
 
    message.reply('Hatanız iletildi');
    var hataHook = new Discord.WebhookClient("Webhook ID", "Webhook Token")
    var embed = new Discord.RichEmbed()
    .setColor("0x36393F")
    .setTitle(`_» Bende Bir Hata Bulmuşlar! «_`)
    .addField(`Bildiren Kullanıcı`, message.author.tag)
    .addField(`Bildirilen Sunucu`, message.guild.name)
    .addField(`Bildirilen Hata`, hata)
    hataHook.send(embed)


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hata', 'bug', 'bug-bildir'],
  permLevel: 0,
  kategori: "bot",

};

exports.help = {
  name: 'hata-bildir',
  description: 'Bottaki bir hatayı bildirmenizi sağlar.',
  usage: 'hata-bildir <bulduğunuz hata>',
 
};