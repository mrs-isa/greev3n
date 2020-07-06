const Discord = require("discord.js");
const prefixes = require("../prefixes.json")

module.exports.run = async (bot, message, args) => {

    let question = args.join(" ").slice();
    if(!question) {
        return message.channel.send(`**${message.author} Use: vote {questão}**`);
    }

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`**${message.author}:x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Gerênciar Servidor\`.**`)



    let embed = new Discord.RichEmbed()
    .setColor("GRAY")
    .setAuthor("REAJA PARA VOTAR")
    .setDescription(args.join(" "))
    .setTitle(`Requisitado por ${message.author.username}`)

    let msg = await message.channel.send(embed);

    await msg.react("✅");
    await msg.react("❌");
    message.delete({timeout: 100});
}

module.exports.config = {
    name: "vote",
    aliases: ["poll"]
}