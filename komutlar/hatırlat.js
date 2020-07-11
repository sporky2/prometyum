const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db")


module.exports.run = async (client, message, args) => {
    const snekfetch = require("snekfetch");
    let prefix =
        (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;

    if(message.channel.type == "dm")  return;
    if(message.channel.type !== "text") return;
    let duration = args[0];
    let sure = args[1];
    let sebep = args[2];
    let user = message.author
    let bisi;

    if (!duration || duration >= '60')
    {
        return message.reply(`Lütfen, geçerli bir süre belirtiniz.\nÖrnek olarak: ${prefix}hatırlat 10 dakika sebep`);
    }

    if (!sure || !sure == 'saniye' || !sure == 'dakika' || !sure == 'saat' || !sure == 'gün' )
    {
        return message.reply(`Süreyi hatalı girdiniz gün, saat, dakika, saniye biçiminde yazmalısınız.!\nÖrnek olarak: ${prefix}hatırlat 10 dakika sebep`)
    }

    if (!sebep) return message.reply('Lütfen, bir sebep belirtiniz.')

    message.reply(`Hatırlatıcı, başarılı bir şekilde ayarlandı!`)

    if (sure == 'saniye') bisi = 'seconds'
    if (sure == 'dakika') bisi = 'minutes'
    if (sure == 'saat') bisi = 'hours'
    if (sure == 'gün') bisi = 'days'

    setTimeout(function(){
        let Zamanlayıcı = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(`Hatırlatma sistemi!`, client.user.displayAvatarURL)
            .addField(`${message.author.username}, süre doldu!`, `Süre dolduğundan dolayı hatırlatıcı devreye girdi.`)
            .addField(`Hatırlatma nedeni ise;`, sebep)

        return user.send(Zamanlayıcı);
    }, ms(`${duration} ${bisi}`));

}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hatırlatıcı'],
    kategori: 'genel',
    permLevel: 0
};

exports.help = {
    name: 'hatırlat',
    description: 'Süre dolduğunda, hatırlatma yapar!',
    usage : 'hatırlat'
};