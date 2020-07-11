const Discord = require('discord.js');//Çalan orul orul orospudur 
const { randomRange, verify } = require('../util/Util');
const { stripIndents } = require('common-tags');
const db = require("quick.db")
exports.run = async (client, message, args) => {

		  
  this.games = new Set();
  
    this.verifyWin = (sides) => {
		return (sides[0] === sides[1] && sides[0] === sides[2])
			|| (sides[0] === sides[3] && sides[0] === sides[6])
			|| (sides[3] === sides[4] && sides[3] === sides[5])
			|| (sides[1] === sides[4] && sides[1] === sides[7])
			|| (sides[6] === sides[7] && sides[6] === sides[8])
			|| (sides[2] === sides[5] && sides[2] === sides[8])
			|| (sides[0] === sides[4] && sides[0] === sides[8])
			|| (sides[2] === sides[4] && sides[2] === sides[6]);
  }
    
  const opponent = message.mentions.users.first()
  if (!opponent) return message.reply('Bir kullanıcı girmelisiniz!')
  if (opponent.bot) return message.reply('Botla oynayacak kadar yalnızmısın aga :smoking:.');
		if (opponent.id === message.author.id) return message.reply('Kendinle X-O-X mu atacaksın manyak seni !.');
		if (this.games.has(message.channel.id)) return message.reply('Bir kanalda en fazla bir X-O-X oynanabilir.');
		this.games.add(message.channel.id);
		try {
			await message.channel.send(`${opponent},X-O-X Oynamayı kabul ediyor musun?`);
			const verification = await verify(message.channel, opponent);
			if (!verification) {
				this.games.delete(message.channel.id);
				return message.channel.send('Görünüşe göre kabul edilemedi!');
			}
			const sides = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
			const taken = [];
			let userTurn = true;
			let winner = null;
			while (!winner && taken.length < 9) {
				const user = userTurn ? message.author : opponent;
				const sign = userTurn ? 'X' : 'O';
				await message.channel.send(stripIndents`
					${user}, hangi tarafı almak istersin?
					\`\`\`
					${sides[0]} | ${sides[1]} | ${sides[2]}
					—————————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					—————————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					\`\`\`
				`);
				const filter = res => {
					const choice = res.content;
					return res.author.id === user.id && sides.includes(choice) && !taken.includes(choice);
				};
				const turn = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!turn.size) {
					await message.channel.send('Üzgünüm, zaman doldu!');
					userTurn = !userTurn;
					continue;
				}
				const choice = turn.first().content;
				sides[Number.parseInt(choice, 10)] = sign;
				taken.push(choice);
				if (this.verifyWin(sides)) winner = userTurn ? message.author : opponent;
				userTurn = !userTurn;
			}
			this.games.delete(message.channel.id);
			return message.channel.send(winner ? `Tebrikler, ${winner}!` : 'Oh... Hiçkimse kazanamadı.');
		} catch (err) {
			this.games.delete(message.channel.id);
			throw err;
		}
	
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: 'eğlence',
}

exports.help = {
    name: 'xox',
    description: 'Log kanalını belirler.',
    usage: 's$kanal <#kanal>'
}