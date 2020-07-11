const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk')


module.exports = async message => {
  
  let client = message.client;
  const ayarlar = client.ayarlar
  
  if (!message.guild) return;
  
let prefix;
  
if (db.has(`prefix_${message.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${message.guild.id}`)
}
  
if (db.has(`prefix_${message.guild.id}`) === false) {
  prefix = client.ayarlar.prefix
}
  
  var args = message.content.split(' ').slice(1)
  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  
  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  
  if(cmd) {
const data = require('quick.db')
const dsd = await data.fetch(`bakim.modu.${client.user.id}`)
if (dsd) {
if (message.author.id !== client.ayarlar.sahip) {
message.channel.send(`${prefix}${command} isimli komut şu anda bakımdadır.`)
return }  }
  }
  
  if (cmd) {

    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  
  }
    
};

