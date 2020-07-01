const Discord = require('discord.js');
 
exports.run = async (bot, message, args) => {

    let reportado = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!reportado) return message.channel.send(`**${message.author} :x: || Por favor utilize o comando da seguinte maneira: <report @usuário {motivo} {canal em que o usuário está^}**`);
    
    let motivo = args.join(" ").slice(22);
    if(!motivo) return message.channel.send(`**${message.author} :x: Por favor específique o motivo do report!**`);

    let canal = message.mentions.channels.first() || message.guild.channels.get(args(2))
    if(!canal) message.channel.send(`**${message.author} :x: || Por favor mencione o canal em que o usuário reportado está atualmente!**`)

    let embed = new Discord.RichEmbed()
    .setTitle("REPORT")
    .setColor("#15f153")
    .addField("Usuário reportado:", `${reportado} (ID: ${reportado.id})`)
    .addField("Reportado por:", `${message.author} (ID: ${message.author.id})`)
    .addField("Canal:", `${canal}`)
    .addField("Motivo:", `${motivo}`)
    .addField("Hora:", message.createdAt)
    .setTimestamp()
    .setFooter("GREEV3N || Criado por: Mrs_Isa");

    message.channel.send(embed)
}

module.exports.config = {
    name: "report",
    aliases: ["reportar"]
}