const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author}:x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Gerênciar Mensagens\`.**`);
   
    let botmessage = args.join(" ");
    if(!botmessage) {
        let sayEmbed = new Discord.RichEmbed()

        .setColor("RANDOM")
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
        .setTitle("SAY COMMAND")
        .setDescription(`Me faça dizer algo!`)
        .addField(`**\nComo se usa? É simples, basta utilizar \`<say\`**`)
        .addField(`**\nEXEMPLOS**`)
        .addField(`\n\`<say Eu sou legal!\``)
        .addField(`\n\n**:fire: Permissões**`)
        .addField(`Você precisa ter a permissão \`Gerênciar Mensagens\` para usar esse comando.`)
        .setFooter("GREEV3N", bot.user.displayAvatarURL)

        message.channel.send(`${message.author}`, sayEmbed)
    }


    message.delete().catch();
    message.channel.send(botmessage)
}

module.exports.config = {
    name: "say",
    aliases: ["falar", "fala"]
}