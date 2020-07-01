const Discord = require("discord.js");


exports.run = (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) message.channel.send(`**${message.author}:x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Gerênciar Mensagens\`.**`)

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR")) return message.channel.send(`**${message.author} :x: || Eu não tenho permissões o suficiente para efetuar esse comando!**`)

    message.channel.send(`**${message.author} Em que canal você deseja enviar o anúncio?**`).then(msg => {
        let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1}) 
        .on('collect', c => {
            canal = c.mentions.channels.first()
            if(!canal) {
                message.channel.send(`**${message.author} :x: || Por favor mencione o canal em que o anúncio será enviado.**`)
            } else {
                message.channel.send(`**${message.author} Qual será a mensagem desse anúncio?**`).then(msg2 => {
                    let cl = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                    .on('collect', c => {
                        desc = c.content

                        message.channel.send(`**${message.author} Qual será o titúlo desse anúncio?**`).then(msg3 => {
                            let ck = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                            .on('collect', c => {
                                title = c.content

                                message.channel.send(`**${message.author} O anúncio foi enviado com sucesso no canal: ${canal}!**`)

                                let embed = new Discord.RichEmbed()
                                .setAuthor(`Anúncio enviado por: ${message.author.tag}`, message.author.displayAvatarURL)
                                .setColor("RANDOM")
                                .setTitle(`\n${title}`)
                                .setDescription(`\n${desc}`)
                                .setTimestamp()
                                .setFooter("GREEV3N || Criado por: Mrs_Isa", bot.user.displayAvatarURL)

                                canal.send(`@here`, embed)
                            })
                        })
                    })
                })
            }
        })
    });
}

module.exports.config = {
    name: "anunciar",
    aliases: ["announcements", "anúnciar", "anuncio", "anúncio"]
}