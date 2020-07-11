const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const express = require("express");
const moment = require("moment");
require("./util/eventLoader")(client);





/* 
BU KISMI VE AYARLAR.JSON DOSYASINI DOLDURMANIZ BOTUN ÇALIŞMASI İÇİN YETERLİ
*/
client.ayarlar = {
  token: "",// BOTUNUZUN TOKENİ
  prefix: "", // BOTUNUZUN PREFİXİ
  sahip: "", // SİZİN ID'NİZ
  siteyazı: "", // BOT ÇALIŞTIĞINDA SİTEDE GÖRÜNECEK YAZI ** SADECE GLİTCHDE ÇALIŞIR **
  oynuyor: "", // BOTUN OYNUYOR KISMI
  eklendikicklendi: '',// eklendi kicklendi yazısının gönderileceği kanal
  dm: '', //bota gönderilen dm mesajlarının atılacağı kanal
  dbltkn: "" // TOP.GG TOKENİ BOTUNUZ TOP.GG'de YOKSA BOŞ BIRAKIN

};
 /////////////////////////////////////////////// DOLDURMANIZ GEREKEN YERİN SONU  





/////
const DBL = require("dblapi.js");
const dbl = new DBL(client.ayarlar.dbltkn, client);

// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})


/*dbl.webhook.on('ready', hook =&gt; {
  console.log(`Webhook: http://${hook.hostname}:${hook.port}${hook.path}`);
})
dbl.webhook.on('vote', vote =&gt; {
      client.channels.get('690887720842821692').createWebhook(vote.user.username)
    .then(webhook =&gt; webhook.edit(vote.user.username)
        .then(wb =&gt; {
            const hook = new Discord.WebhookClient(client.ayarlar.dbltkn, wb.id, wb.token);
  
  hook.send(`\`${vote.user}\` Oy verdi!`);
  hook.delete()
}))
          });
*/          
/////


const app = express();
app.get("/", (req, res) => res.send(client.ayarlar.siteyazı)); // sitenize girdiğinde görebilirsiniz.
app.listen(process.env.PORT, () =>
  console.log("Port ayarlandı: " + process.env.PORT)
);

var prefix = client.ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;


/////////// MOD - LOG SİSTEMİ ////////////

//log sistemi

//let logA = JSON.parse(fs.readFileSync("./jsonlar/log.json", "utf8"));

client.on("guildMemberAdd", member => {
  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("guildMemberRemove", member => {
  //if (member.author.bot) return;

  // if (!logA[member.guild.id]) return;

  var user = member.user;
  var tarih = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }

  var tarih2 = "";
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  //var kanal = member.guild.channels.get(logA[member.guild.id].log);

  if (db.has(`log_${member.guild.id}`) === false) return;

  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setThumbnail(member.user.avatarURL);
  kanal.send(embed);
});

client.on("messageDelete", message => {
  if (message.author.bot) return;

  db.set(`atan_${message.channel.id}`, `${message.author.tag}`);
  db.set(`mesaj_${message.channel.id}`, message.content);

  //if (!logA[message.guild.id]) return;

  var user = message.author;

  //var kanal = message.guild.channels.get(logA[message.guild.id].log);

  if (db.has(`log_${message.guild.id}`) === false) return;

  var kanal = message.guild.channels.get(db.fetch(`log_${message.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
    .addField("Kullanıcı Tag", message.author.tag, true)
    .addField("ID", message.author.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(message.author.avatarURL);
  kanal.send(embed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  // if (!logA[oldMsg.guild.id]) return;

  var user = oldMsg.author;

  //var kanal = oldMsg.guild.channels.get(logA[oldMsg.guild.id].log);

  if (db.has(`log_${oldMsg.guild.id}`) === false) return;

  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
    .addField("Kullanıcı Tag", oldMsg.author.tag, true)
    .addField("ID", oldMsg.author.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(oldMsg.author.avatarURL);
  kanal.send(embed);
});

client.on("roleCreate", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("roleDelete", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

client.on("roleUpdate", role => {
  // if (!logA[role.guild.id]) return;

  if (db.has(`log_${role.guild.id}`) === false) return;

  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`));
  if (!kanal) return;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal.send(embed);
});

//////////////////// MOD LOG SON /////////////////////

////////////////// AFK SİSTEMİ /////////////////////

client.on("message", async message => {
  const ms = require("parse-ms");
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`:afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    let süre = await db.fetch(`afk_süre_${message.author.id}`);
    let timeObj = ms(Date.now() - süre);
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.channel.send("Başarıyla AFK modundan çıktın." + " ``" + timeObj.hours + ` saat ` + timeObj.minutes + ` dakika ` + timeObj.seconds + `saniye ` + "`` " + "süre boyunca AFK'ydın.").then(message => message.delete(7000));
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);

    message.reply(USER.username + "``" + " adlı kullanıcı " + "``" + REASON + "``" + " sebebiyle " + "``" + "``" + timeObj.hours + ` saat ` + timeObj.minutes + ` dakika` + timeObj.seconds + `saniye` + "``" + "'dır AFK.").then(message => message.delete(7000));
  }
});

/////////////////// AFK SİSTEMİ SON ////////////////////////

////////////////// SES LOG ///////////////////

client.on("voiceStateUpdate", (oldMember, newMember) => {
  let saniye = db.fetch(`seslisaniye_${newMember.guild.id + newMember.id}`);
  let dakika = db.fetch(`seslidakika_${newMember.guild.id + newMember.id}`);
  let saat = db.fetch(`seslisaat_${newMember.guild.id + newMember.id}`);
  let gün = db.fetch(`sesligün_${newMember.guild.id + newMember.id}`);
  let dakikaek = Math.floor(saniye / 60);
  let saatek = Math.floor(dakika / 60);
  let günek = Math.floor(saat / 24);
  let dakikaeksi = saatek * 60;
  let saateksi = günek * 24;
  let saniyeeksi = dakikaek * 60;
  if (saniye => 60) {
    dakika = Math.floor(dakika + dakikaek);
    saniye = Math.floor(saniye - saniyeeksi);
  }
  if (dakika => 60) {
    saat = Math.floor(saat + saatek);
    dakika = Math.floor(dakika - dakikaeksi);
  }
  if (saat => 24) {
    gün = Math.floor(gün + günek);
    saat = Math.floor(saat - saateksi);
  }
  let rol = db.fetch(`sesödül_${newMember.guild.id}`);

  if (oldMember.voiceChannel && newMember.voiceChannel) {
    if (oldMember.voiceChannelID === newMember.voiceChannelID) return;
  }
  let saati = db.fetch(`seslisüredakikası_${newMember.guild.id}`);
  let dilimi = db.fetch(`seslisüredilimi_${newMember.guild.id}`);

  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;
  let ms1 = require("parse-ms");
  let süre = db.fetch(`seslisüre_${newMember.guild.id + newMember.id}`);
  let timeObj = ms1(Date.now() - süre);
  let mlog = db.fetch(`seslog_${oldMember.guild.id}`);
  if (!mlog) return;
  if (oldMember.user.bot) return;
  if (newMember.user.bot) return;

  let kanal = client.channels.get(mlog);
  if (oldUserChannel === undefined) {
    let embed = new Discord.RichEmbed()
      .setTitle("Bir Kullanıcı Sesli Kanala Girdi!")
      .setThumbnail(newMember.avatarURL || newMember.defaultAvatarURL)
      .setDescription(
        `Kullanıcı : ${newMember} \nKanalın Adı : ${newUserChannel}`
      )
      .setColor("#66ff00")
      .setTimestamp();
    kanal.send(embed);
    db.delete(`seslisüre_${newMember.guild.id + newMember.id}`);
    db.set(`seslisüre_${newMember.guild.id + newMember.id}`, Date.now());
  }
  if (newUserChannel === undefined) {
    let embed = new Discord.RichEmbed()
      .setTitle("Bir Kullanıcı Sesli Kanaldan Çıktı!")
      .setThumbnail(oldMember.avatarURL || oldMember.defaultAvatarURL)
      .setDescription(
        `Kullanıcı : ${oldMember} \nKanalın Adı : ${oldUserChannel}\n Sesli Kanalda Bulunma Süresi: **${timeObj.days} gün ${timeObj.hours} saat ${timeObj.minutes} dakika ${timeObj.seconds} saniye!**`
      )
      .setColor("#ff0000")
      .setTimestamp();
    kanal.send(embed);
    if (!newMember.roles.some(Rol => Rol.id === rol)) {
      if (dilimi == "saniye") {
        if (timeObj.seconds >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "dakika") {
        if (timeObj.minutes >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "saat") {
        if (timeObj.hours >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "gün") {
        if (timeObj.days >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
    }
    if (!newMember.roles.some(Rol => Rol.id === rol)) {
      if (dilimi == "saniye") {
        if (saniye >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "dakika") {
        if (dakika >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "saat") {
        if (saat >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "gün") {
        if (gün >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
    }

    db.add(`seslisaniye_${newMember.guild.id + newMember.id}`, timeObj.seconds);
    db.add(`seslidakika_${newMember.guild.id + newMember.id}`, timeObj.minutes);
    db.add(`seslisaat_${newMember.guild.id + newMember.id}`, timeObj.hours);
    db.add(`sesligün_${newMember.guild.id + newMember.id}`, timeObj.days);
    db.delete(`seslisüre_${newMember.guild.id + newMember.id}`);
    db.set(`seslisüre_${newMember.guild.id + newMember.id}`, Date.now());
  }
  if (newUserChannel) {
    if (newUserChannel === undefined) return;
    if (oldUserChannel === undefined) return;

    let embed = new Discord.RichEmbed()
      .setTitle("Bir Kullanıcı Başka Bir Sesli Kanala Geçti!")
      .setDescription(
        `Kullanıcı : ${newMember} \nEski Kanalın Adı : ${oldUserChannel}\nEski Kanalda Bulunma Süresi : **${timeObj.days} gün ${timeObj.hours} saat ${timeObj.minutes} dakika ${timeObj.seconds} saniye!**\nYeni Kanalın Adı : ${newUserChannel}`
      )
      .setColor("#ffff00")
      .setTimestamp();
    kanal.send(embed);
    if (!newMember.roles.some(Rol => Rol.id === rol)) {
      if (dilimi == "saniye") {
        if (saniye >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "dakika") {
        if (dakika >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "saat") {
        if (saat >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "gün") {
        if (gün >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
    }

    if (!newMember.roles.some(Rol => Rol.id === rol)) {
      if (dilimi == "saniye") {
        if (timeObj.seconds >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "dakika") {
        if (timeObj.minutes >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "saat") {
        if (timeObj.hours >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
      if (dilimi == "gün") {
        if (timeObj.days >= saati) {
          oldMember.addRole(rol);
          let embed = new Discord.RichEmbed()
            .setDescription(
              `${oldMember} Adlı Kullanıcı ${oldUserChannel} Sesli Kanalında ${saati} ${dilimi} Bulunarak <@&${rol}> Rolünü Kazandı!`
            )
            .setColor("RANDOM");
          kanal.send(embed);
        }
      }
    }
    db.add(
      `seslisaniyeee_${newMember.guild.id + newMember.id}`,
      timeObj.seconds
    );
    db.add(
      `seslidakikaaa_${newMember.guild.id + newMember.id}`,
      timeObj.minutes
    );
    db.add(`seslisaat_${newMember.guild.id + newMember.id}`, timeObj.hours);
    db.add(`sesligün_${newMember.guild.id + newMember.id}`, timeObj.days);
    db.delete(`seslisüre_${newMember.guild.id + newMember.id}`);
    db.set(`seslisüre_${newMember.guild.id + newMember.id}`, Date.now());
  }
});

//////

client.on("message", async message => {
  let prefix = "-";
  if (message.content.startsWith(prefix)) return;
  db.add(`mesajsayısı_${message.guild.id + message.author.id}`, 1);
});

////////////////////// SES LOG SON /////////////////////////

//////////////////// BOT DM ////////////////////////

client.on("message", msg => {
  var dm = client.channels.get(client.ayarlar.dm); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL}`)
      .addField(":boy: Gönderen ", msg.author.tag)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});

////////////////////// BOT DM SON ////////////////////////

/////////////////// SA AS SİSTEMİ /////////////////////
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`ss_${msg.guild.id}`);
  if (db.has(`ss_${msg.guild.id}`) === true) {
    if (db.has(`üyelikk_${msg.author.id}`)) {
      if (msg.content.toLowerCase() === "sa") {
        msg.channel.send(`Aleyküm Selam ${msg.author}`);
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selam") {
        msg.channel.send(`Aleyküm Selam ${msg.author}`);
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "s.a") {
        msg.channel.send(`Aleyküm Selam ${msg.author}`);
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamun aleyküm") {
        msg.channel.send(`Aleyküm Selam ${msg.author}`);
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamün aleyküm") {
        msg.channel.send(`Aleyküm Selam ${msg.author}`);
        db.add(`slmal_${msg.author.id}`, 1);
      }
    } else if (msg.content.toLowerCase() === "sa") {
      msg.channel.send(`Aleyküm Selam ${msg.author}`);
      db.add(`slmal_${msg.author.id}`, 1);
    } else if (msg.content.toLowerCase() === "selam") {
      msg.channel.send(`Aleyküm Selam ${msg.author}`);
      db.add(`slmal_${msg.author.id}`, 1);
    }
  }
});
//////////////////// SA AS SON ////////////////////

/////////////////// EKLENDİ ATILDI ////////////////////

///////////////////////////////////////////////

client.on("guildCreate", guild => {
  let hob = client.channels.get(client.ayarlar.eklendikicklendi);
  const bumm = new Discord.RichEmbed()

    .setTitle(`Sunucuya Eklendim`)
    .setTimestamp()
    .setColor("GREEN")
    .setImage(guild.iconURL)
    .addField(`Sunucu İsmi`, guild.name)
    .addField(`Sunucu ID`, guild.id)
    .addField(`Kurucu`, guild.owner.user.tag)
    .addField(`Kurucu ID`, guild.owner.user.id)
    .addField(`Üye Sayısı`, guild.memberCount);

  hob.send(bumm);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildDelete", guild => {
  let hbb = client.channels.get(client.ayarlar.eklendikicklendi);
  const bb = new Discord.RichEmbed()

    .setTitle(`Sunucudan Atıldım`)
    .setTimestamp()
    .setColor("RED")
    .setImage(guild.iconURL)
    .addField(`Sunucu İsmi`, guild.name)
    .addField(`Sunucu ID`, guild.id)
    .addField(`Kurucu`, guild.owner.user.tag)
    .addField(`Kurucu ID`, guild.owner.user.id)
    .addField(`Üye Sayısı`, guild.memberCount);

  hbb.send(bb);
});

//////////////////////////////////////////////////////////////////////////////////////////


//////////////////////// EKLENDİ ATILDI SON ////////////////////

//////////////////// OTOROL SİSTEMİ ////////////////////

client.on('guildMemberAdd', async (member, guild, message) => {
 
let role = db.fetch(`otorolisim_${member.guild.id}`)
 let otorol = db.fetch(`autoRole_${member.guild.id}`)
 let i = db.fetch(`otorolKanal_${member.guild.id}`)
 if (!otorol || otorol.toLowerCase() === 'yok') return;
else {
 try {
 
 
  if (!i) return
if (!role) {
  member.addRole(member.guild.roles.get(otorol))
                        var embed = new Discord.RichEmbed()
                        .setDescription("**Sunucuya Yeni Katılan** @" + member.user.tag + " **Kullanıcısına** <@&" + otorol + ">  **Rolü verildi.**")
                        .setColor('0x36393E')
                        .setFooter(`Otorol Sistemi`)
     member.guild.channels.get(i).send(embed)
} else if (role) {
    member.addRole(member.guild.roles.get(otorol))
                        var embed = new Discord.RichEmbed()
                        .setDescription(`**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi.**`)
                        .setColor('0x36393E')
                        .setFooter(`Otorol Sistemi`)
     member.guild.channels.get(i).send(embed)
 
}
 
 } catch (e) {
 console.log(e)
}
}
 
});

//////////////////// OTOROL SON ////////////////////




/////////////////// GOLD ÜYE /////////////////////

client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let timeout = 600000
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = db.fetch(`gold_${msg.author.id}`)
          if (i == 'gold') {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});

////////////////////// GOLD ÜYE SON //////////////////


///////////////////// KÜFÜR ENGEL /////////////////

client.on("message", async msg => {
  
  
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${newMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!newMessage.member.hasPermission("BAN_MEMBERS")) {
                  newMessage.delete();
                          
                      return newMessage.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

/////////////////// KÜFÜR ENGEL SON ////////////////





//////////////////// REKLAM ENGEL ////////////////

client.on("message", async  msg => {
 var i = await db.fetch(`reklam_${msg.guild.id}`)
    if (i == 'acik') {
       const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl",".ga","cf", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('no reklam').then(msg => msg.delete(3000));
    

  msg.delete(3000);                              

            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  })
  ;

/////////////////// REKLAM ENGEL SON /////////////




client.on("ready", async () => {
	//
	console.log(
    `${chalk.green(client.user.username)}${chalk.red(",")} ${chalk.green(
      client.guilds.size
    )} ${chalk.yellow("Sunucu'ya")} ${chalk.red("ve")} ${chalk.green(
      client.users.size.toLocaleString()
    )} ${chalk.yellow("Kullanıcı'ya")} ${chalk.red("hizmet veriyor!")}`
  );
  //
  client.user.setStatus("idle"); //botun durumu [idle (boşta), dnd(Rahatsız Etmeyin), online(Çevrimiçi)]
  client.user.setActivity(client.ayarlar.oynuyor, { type: "WATCHING" }); // WATCHİNG (izliyor), LISTENING (dinliyor), PLAYİNG (OYNUYOR)
});

client.login(client.ayarlar.token);

