const Discord = require('discord.js')

exports.run = async function(client, message, args) {
   if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Bu Komutu kullanmanız için `Mesajları Yönet` yetkisine sahip olmalısınız.') 
let embed = args.slice(0).join(' ');
        if (embed.length < 1) {
        return message.channel.send(`Embed olarak ne yazmamı istersin`);
            } else {
              message.delete(3)
        const yaz = new Discord.RichEmbed()
        .setColor('0x36393E')
        .setDescription(`${embed}`)
        .setFooter('Prometyum',client.user.avatarURL)
        return message.channel.sendEmbed(yaz)
      }
     }

  

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yazdır'],
    permLevel: 2 ,
    kategori:'moderasyon'
};

exports.help = {
    name: 'yaz',
    description: 'Yazınızı bota yazdırır.',
    usage: ':yaz <mesaj>'
};