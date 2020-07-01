const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author}:x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Gerênciar Mensagens\`.**`)

    var winnerCount = args[0];
    var item = args[1];
    var time = args.splice(2, args.lenght).join(" ");

    message.delete();

    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));

    let embed = new Discord.RichEmbed()

    .setTitle("🎉 GIVEAWAY 🎉")
    .addField("**PRÊMIO:**", item)
    .addField("Encera em:", dateTime)
    .addField("Iniciado por:", message.author)
    .setDescription("**Reaja com 🎉 para participar**")
    .setTimestamp();

    let sendEmbed = await message.channel.send(embed);
    sendEmbed.react("🎉");

    setTimeout(function() {

        var random = 0;
        var winner = [];
        var inList = false;

        var peopleReacted = sendEmbed.reactions.get("🎉").array();

        for(let i = 0; i < peopleReacted.lenght; i++) {
            if(peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }

        if(peopleReacted.lenght == 0){
            return message.channel.send("**Ningúem reagiu ao sorteio, então não houve ganhadores.**");
        }

        if(peopleReacted.lenght < winnerCount){
            return message.channel.send("**Tem poucos jogadores participando, então o bot se identificou.**");
        }

        for(let i = 0; i < winnerCount.lenght; i++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.lenght);

            for(let y = 0; y < winner.lenght; y++) {
                if(winner[y] == peopleReacted[random]){
                    inList = true;
                    i--;
                    break;
                }
            }

            if(!inList){
                winner.push(peopleReacted[random]);
            }

        }

        for(let i = 0; i < winner.length; i++){
            message.channel.send(`**${message.author} Parabéns! Você ganhou um ${item}`);
        }

    }, time * 1000)
}

module.exports.config = {
    name: "giveaway",
    aliases: []
}