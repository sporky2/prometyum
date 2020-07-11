const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async(client, msg, args) => {
	
let prefix = (await db.fetch(`prefix_${msg.guild.id}`)) || client.ayarlar.prefix
const linkler = `[Bot Davet Linki!](https://discord.com/oauth2/authorize?client_id=691423981223411753&scope=bot&permissions=268443710) | [Bot Sitesi](http://panel.promethium.gq)`
const asdas = `<a:xd:726868222598447136> Botu kullanırken hata ile karşılaşırsanız **${prefix}hata-bildir** komutunu kullanabilir, **bota** veya **BestInSpire#5810** adlı kullanıcıya dm atabilirsiniz.`;

if(!args[0]){
const embed = new Discord.RichEmbed()
       .setColor('#4CE0C2')
       .setAuthor(`Promethium Yardım Menüsü`)
       .setDescription(`
${asdas}\n
**${prefix}yardım kullanıcı** => Herhangi bir izin gerektirmeden tüm kullanıcıların kullanabileceği komutları listeler.
**${prefix}yardım kullanıcı2** => Kullanıcı komutlarının devamını gösterir.
**${prefix}yardım bot** => Bota özel komutları listeler.
**${prefix}yardım eğlence **=> Sunucu ortamını eğlendirmek için olan komutları listeler.
**${prefix}yardım moderasyon** => Sunucu yetkililerinin işini kolaylaştıracak komutları listeler.
**${prefix}yardım ayarlar** => Sunucuya özel ayarlanabilir komutları listeler.\n
${linkler}
`)

       .setThumbnail('https://images-ext-1.discordapp.net/external/KYQJUt9MkMwBWkdevOlU6ydbVJrC1oTH0HJHPRzM1R0/%3Fsize%3D256/https/cdn.discordapp.com/avatars/691423981223411753/14befebe29316156680bd205159e96b8.png')
   msg.channel.send(embed)
  }else{
let kategoriler = ['kullanıcı', 'kullanıcı2', 'bot', 'eğlence', 'moderasyon', 'ayarlar','müzik'];
let argüman = args[0]
if(!kategoriler.includes(args[0])) return msg.channel.send(`**${argüman}** adlı kategori bulunamadı.`)

}

if(args[0] === 'kullanıcı'){

  const kullanıcı = new Discord.RichEmbed()
       .setColor('#4CE0C2')
       .setAuthor(`Promethium Yardım Menüsü`)
       .setTitle(`Kullanıcı Komutları`)
       .setDescription(`
**${prefix}afk** => Kullanıcıyı afk moduna sokar.
**${prefix}avatar** => Sizin veya etiketlediğiniz kişinin avatarını gösterir.
**${prefix}banlananlar **=> Sunucuda banlanan üyeleri gösterir.
**${prefix}döviz** => Güncel Döviz kurlarını gösterir.
**${prefix}hatırlat** => Belirttiğiniz sürenin sonunda bot mesajınızı özelden atar.
**${prefix}hava-durumu** => Belirttiğiniz bölgenin hava durumu bilgisini atar.
**${prefix}kitap-ara** => Belirtilen kitabın bilgilerini gösterir.
**${prefix}korona-bilgi** => Belirtilen ülkenin son açıklanmış korona verilerini gösterir.
**${prefix}kullanıcı-bilgi **=> Komutu kullanan kişi hakkında bilgi verir.
**${prefix}kısalt** => İstediğiniz linki kısaltır.
**${prefix}sesli-süre** => Bulunduğun sesli kanalda kaç dakika geçirdiğini gösterir.
**${prefix}spotify** => Spotifyda müzik dinleyen bir kullanıcının dinlediği müzik hakkında bilgi verir.
**${prefix}statlarım** => Kullanıcının sesli kanaldaki toplam bulunma süresini gösterir.
**${prefix}yetkilerim** => Komutu kullandığınız sunucudaki yetkilerinizi gösterir.
**${prefix}youtube** => YouTube'da arama yaparsınız.

${linkler}
`)

       .setThumbnail('https://images-ext-1.discordapp.net/external/KYQJUt9MkMwBWkdevOlU6ydbVJrC1oTH0HJHPRzM1R0/%3Fsize%3D256/https/cdn.discordapp.com/avatars/691423981223411753/14befebe29316156680bd205159e96b8.png')
  msg.channel.send(kullanıcı)

}


if(args[0] === 'kullanıcı2'){

  const kullanıcı = new Discord.RichEmbed()
       .setColor('#4CE0C2')
       .setAuthor(`Promethium Yardım Menüsü`)
       .setTitle(`Kullanıcı Komutları`)
       .setDescription(`
**${prefix}atatürk** => Rastgele Atatürk fotoğrafı atar.
**${prefix}playstore** => Google Play Store'da arama yaparsınız.
**${prefix}çeviri** => İngilizce - Türkçe çeviri.
**${prefix}csgo** => CSGO istatistiklerinizi gösterir.

${linkler}
`)

       .setThumbnail('https://images-ext-1.discordapp.net/external/KYQJUt9MkMwBWkdevOlU6ydbVJrC1oTH0HJHPRzM1R0/%3Fsize%3D256/https/cdn.discordapp.com/avatars/691423981223411753/14befebe29316156680bd205159e96b8.png')
  msg.channel.send(kullanıcı)

}


  if(args[0] === 'eğlence'){
const eğlence = new Discord.RichEmbed()
       .setColor('#4CE0C2')
       .setAuthor(`Promethium Yardım Menüsü`)
       .setTitle(`Eğlence Komutları`)
       .setDescription(`
**${prefix}aşk-ölçer** => 2 kullanıcı arasındaki aşkı ölçer.
**${prefix}balık-tut** => Balık tutarsınız.
**${prefix}cowsay** => Yazdığınız yazıyı ineğe söyletir.
**${prefix}duello **=> İstediğiniz bir kişi ile 1vs1 atarsınız.
**${prefix}espri** => Espri yapar.
**${prefix}kedi** => Rastgele kedi resmi atar.
**${prefix}romen** => Belirttiğiniz sayının romen karşılığını atar.
**${prefix}tkm **=> Taş, kağıt, makas oyunu oynarsınız.
**${prefix}xox** => Etiketlediğiniz kişi ile xox oynarsınız.
**${prefix}yılbaşı** => Yılbaşının kutlanmasına kaç gün, kaç saat, kaç dakika kaldığını gösterir.
**${prefix}öp** => Etiketlediğiniz kişiyi öpersiniz.
**${prefix}film-öner** => Tüm bilgileriyle rastgele film önerir.
**${prefix}yodasay** => Yazınızı Yoda'ya söyletir.

${linkler}
`)

       .setThumbnail('https://images-ext-1.discordapp.net/external/KYQJUt9MkMwBWkdevOlU6ydbVJrC1oTH0HJHPRzM1R0/%3Fsize%3D256/https/cdn.discordapp.com/avatars/691423981223411753/14befebe29316156680bd205159e96b8.png')
  msg.channel.send(eğlence)
}


  if(args[0] === 'bot'){
    
    const bot = new Discord.RichEmbed()
       .setColor('#4CE0C2')
       .setAuthor(`Promethium Yardım Menüsü`)
       .setTitle(`Bot Komutları`)
       .setDescription(`
**${prefix}altyapı** => Botun altyapısının glitch ve github linklerini atar.
**${prefix}hata-bildir** => Karşılaştığınız hataları bot yetkililerine ulaştırmanızı sağlar.
**${prefix}istatistik** => Botun istatistiklerini gösterir.
**${prefix}komutlar **=> Bottaki komut sayısını gösterir.
**${prefix}tavsiye** => Bot hakkında öneri veya isteklerinizi bot yetkililerine gönderir.
**${prefix}yardım** => Bottaki tüm komutları ayrıntılarıyla listeler.

${linkler}`)
    
    
    msg.channel.send(bot)
  }
  
  
  
  if(args[0] === 'moderasyon'){
  const mod = new Discord.RichEmbed()
       .setColor('#4CE0C2')
       .setAuthor(`Promethium Yardım Menüsü`)
       .setTitle(`Moderasyon Komutları`)
       .setDescription(`
**${prefix}temizle** => Belirtilen miktarda mesaj siler.
**${prefix}yasakla** => Etiketlediğiniz kişiyi sunucuda yasaklar.
**${prefix}at** => Etiketlediğiniz kişiyi sunucudan atar.
**${prefix}oylama** => Oylama yaparsınız.
**${prefix}unban **=> ID'si girilen kullanıcının yasaklamasını kaldırır.
**${prefix}uyar** => Belirtilen kişiyi belirtilen sebeple uyarır.
**${prefix}uyarı-kaldır **=> Belirtilen kişinin uyarılarını kaldırır.
**${prefix}uyarılar** => Belirtilen kişinin kaç uyarı aldığını gösterir.
**${prefix}yaz** => Mesajınızı bota yazdırır.
**${prefix}duyuru** => Duyuru yapar

${linkler}`)
  msg.channel.send(mod)
}
  
  
  
  if(args[0] === 'ayarlar'){
    
    const ayarlar = new Discord.RichEmbed()
       .setColor('#4CE0C2')
       .setAuthor(`Promethium Yardım Menüsü`)
       .setTitle(`Sunucuya Özel Ayarlanabilir Komutlar`)
       .setDescription(`
**${prefix}mod-log** => Mod-Log kanalını belirler. (Sıfırlamak için :modlog sıfırla)
**${prefix}otorol** => Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir. (Kapatmak için ":otorol sıfırla")
**${prefix}prefix** => Sunucuyaz özel prefix ayarlarsınız.
**${prefix}sa-as** => Selamün Aleyküm yazıldığında, Aleyküm Selam diye cevap verme sistemini açıp kapatır.
**${prefix}ses-log-ayarla** => Ses Log Kanalını Ayarlar!. (Sıfırlamak için :seslog sıfırla.)
**${prefix}sesli-ayarla** => Sesli kanalda bulunanlara ödül rolü için gerekli süreyi ayarlar
**${prefix}sesli-rol** => Belirlenen süre boyunca sesli kanalda bulunan üyelere belirtilen rolü verir.

${linkler}`)
  msg.channel.send(ayarlar)
    
  }


  
  
  
  
    if(args[0] === 'müzik'){
    
    const ayarlar = new Discord.RichEmbed()
       .setColor('#4CE0C2')
       .setAuthor(`Promethium Yardım Menüsü`)
       .setTitle(`Müzik Sistemi Komutları`)
       .setDescription(`
**${prefix}oynat** => Bir müzik açarsınız.
**${prefix}durdur** => Çalan müziği durdurur.
**${prefix}geç** => Listedeki diğer müziğe geçer.
**${prefix}devamet** => Durdurulan müziği devam ettirir.
**${prefix}sesiayarla** => Çalan müziğin ses seviyesini ayarlar.
**${prefix}tekraret** => Çalan müziği baştan açar.
**${prefix}çalan** => Çalan müziği gösterir.
**${prefix}liste** => Sıraya eklenmiş müzikleri listeler.
**${prefix}iptal** => Çalan müziği ve listeyi iptal eder.
**${prefix}listeyi-temizle** => Eklenen müzik listesini temizler.

${linkler}`)
  msg.channel.send(ayarlar)
    
  }
  
  
  
  
}


 





exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: 'yardım'
};
