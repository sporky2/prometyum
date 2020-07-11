const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
exports.run = (bot, message, params) => {
  const filterLevels = ['Yok', 'Rolü Olmayanlar İçin', 'Herkes İçin']
       const tarih =  message.guild.createdAt

let kur = {
			"01": "Ocak",
			"02": "Şubat",
			"03": "Mart",
			"04": "Nisan",
			"05": "Mayıs",
			"06": "Haziran",
			"07": "Temmuz",
			"08": "Ağustos",
			"09": "Eylül",
			"10": "Ekim",
			"11": "Kasım",
			"12": "Aralık"
    }
   const embed = new Discord.RichEmbed()
   .setColor("#D2EE07")
   .setAuthor(message.guild.name, message.guild.userURL)
   .setThumbnail(message.guild.iconURL,)
      .addField(':arrow_right:   Ad ve ID', `📝 ${message.guild.name + ', '+ message.guild.id}`, false)
   		.addField(':arrow_right:   Kanallar', `:small_orange_diamond:Toplam: ${message.guild.channels.size} | :keyboard: Yazı: ${message.guild.channels.filter(c => c.type === "text").size} | :microphone2: Sesli: ${message.guild.channels.filter(c => c.type === "voice").size}`, false)
      .addField(':arrow_right:   Üyeler', `:bust_in_silhouette: Üye: ${message.guild.memberCount} | <:online:500353658261733397> Çevrimiçi: ${message.guild.members.filter(m => m.user.presence.status != "offline").size}`, true)
			.addField(':arrow_right:   Roller', `:lock: ${message.guild.roles.size}`,false)
   		.addField(':arrow_right:   Rol Listesi', message.guild.roles.map(roles => `\`${roles.name}\``).join(' '))
			.addField(':arrow_right:  Sakıncalı içerik filtresi', `:underage: ${filterLevels[message.guild.explicitContentFilter]}`,false)
      .addField(':arrow_right:   Bölge', message.guild.region.replace('europe',':map: Avrupa'),false)
      .addField(':arrow_right:   Oluşturulma Tarihi', `:calendar_spiral: ${moment(message.guild.createdAt).format('DD')} ${kur[moment(message.guild.createdAt).format('MM')]} ${moment(message.guild.createdAt).format('YYYY h:mm:ss')}`)
      .addField(':arrow_right:   Sunucu Sahibi', `:crown: ${message.guild.owner.user+''}`,false)
   .setTimestamp()
   message.channel.send({embed});
   message.react('✓');
};
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: 0
 };

 exports.help = {
   name: 'sunucu-bilgi',
   description: 'Kullanılan Yerdeki Sunucu Bilgilerini Gösterir.',
   usage: 'sunucu-bilgi'
 };