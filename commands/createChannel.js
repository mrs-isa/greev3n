const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`**`)
    let canal = args[0].join(" ");

    message.guild.createChannel(args[0]) 
    message.channel.send(`**${message.author} O Canal ${canal} foi criado com sucesso!**`)
    
}

module.exports.config = {
    name: "createChannel",
    aliases: ["newChannel", "channel", "new-channel", "canal"]
}