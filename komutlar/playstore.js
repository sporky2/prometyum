const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const gplay = require('google-play-scraper')
exports.run = function(client, message, args) {
  var prefix = ayarlar.prefix
 
  const  uyg = args.join(' ')
 
        if (!uyg) return message.channel.send("Bir Uygulama İsmi Girmelisin")
        if (uyg) {
         
                gplay.search({
                lang: 'tr',
                term: uyg,
                country: 'tr',
                fullDetail: true
                 
           
                 
            }).then((x) => {      
                const game = x[0]
               
                var bymayfe = game.editorsChoice
               
                if(bymayfe === true) {
                bymayfe = "Editörün Seçimi"
                } else {
                  bymayfe = "Değil"                  
                }
               
                const gameEmbed = new Discord.RichEmbed()
                    .setTitle(game.title)
                    .setDescription(game.summary + `\n\n[Ziyaret İçin Tıkla](${game.url})`)
                    .addField("Puan: ", game.scoreText, true)
                    .addField("Fiyat: ", game.priceText, true)
                    .addField("İndirilme: ", game.installs, true)
                    .addField("Geliştirici: ", game.developer, true)
                    .addField("Boyut: ", game.size, true)
                    .addField("Editörün Seçimi mi ?: ", bymayfe, true)
                    .setThumbnail(game.icon)
                    .setTimestamp(Date())
                    .setColor(0x008000)
                return message.channel.send(gameEmbed)
            })
        }
}
       
 
 
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["play-store"],
  permLevel: 0
};
 
exports.help = {
  name: "playstore",
  description: "Google Play'den Arama Yapar",
  usage: "playstore"
};
 