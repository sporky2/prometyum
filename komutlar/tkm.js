const
    rps = [
        'makas',
        'taş',
        'kağıt'
    ],
    rpsF = (userAns, botAns) => {
        let choice = userAns,
            botChoice = botAns;
        if (choice === 'taş') {
            if (botChoice === 'makas') {
                return 'won';
            } else if (botChoice === 'kağıt') {
                return 'Kaybetin';
            }

            return 'draw';
        } else if (choice === 'kağıt') {
            if (botChoice === 'taş') {
                return 'lost';
            } else if (botChoice === 'makas') {
                return 'Kazandın';
            }

            return 'draw';
        } else if (choice === 'makas') {
            if (botChoice === 'taş') {
                return 'lost';
            } else if (botChoice === 'kağıt') {
                return 'Kazandın';
            }

            return 'draw';
        }
    };

exports.run = async (client, msg, args) => {
		    let kullanıcı = await db.fetch(`gold_${message.author.id}`);

  if( kullanıcı == undefined){
message.reply("**Maalesef bu komutu kullanamazsın gold üye değilsin :( Ücretsiz ve karşılıksız gold üye olmak için `BestInSpire#5810` adlı kullanıcıya mesaj atman yeterli.**")
  }else{
      if( kullanıcı == "gold"){
		  
    if (!args[0]) {
        return msg.channel.send('Lütfen seçimini yap taş, kağıt yada makas & tkm <taş,kağıt,makas>');
    }
    let choice = args[0].toLowerCase();
    choice = choice === 't' ? 'taş' : choice;
    choice = choice === 'k' ? 'kağıt' : choice;
    choice = choice === 'm' ? 'makas' : choice;
    if (!rps.includes(choice)) {
        return msg.channel.send('Lütfen seçimini yap taş, kağıt yada makas & tkm <t,k,m>');
    }
    let rand = Math.floor(Math.random() * 3);
    let botChoice = rps[rand];
    let result = rpsF(choice, botChoice);
    let answer = '';

    if (result === 'won') {
        answer = ':trophy: Başarılı, sen **Kazandın** :trophy: \nSenin Seçtiği: `' + choice + '` | Bot\'un Seçtiği: `' + botChoice + '`';
    } else if (result === 'lost') {
        answer = ':x: Bidakine **Kaybetin Dostum** :x: \nSenin Seçtiğin: `' + choice + '` | Bot\'s Seçtiği: `' + botChoice + '`';
    } else if (result === 'draw') {
        answer = ':neutral_face: Sonuç **Berabere** :neutral_face:\nSenin Seçimin: `' + choice + '` | Bot\'un Seçimi: `' + botChoice + '`';
    }

    msg.channel.send(answer);
  }}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: 'eğlence'
 };
 
 exports.help = {
 name: 'tkm',
 description: 'Taş kağıt makas oyununu oynar.',
 usage: 'tkm'
 }