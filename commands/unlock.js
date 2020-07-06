const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES", "MANAGE_CHANNELS")) return message.channel.send(`**${message.author}:x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Gerênciar Canal\`.**`)

    let channel = message.mentions.channels.first() || message.channel;
    let roles = message.guild.roles;
    roles.forEach((roles) => {
    channel.overwritePermissions(roles, {
        SEND_MESSAGES: true,
        ADD_REACTIONS: true
    });
}); 
    message.channel.send(`**${message.author} :white_check_mark: || Canal desbloqueado com sucesso! Utilize lock para bloquear.**`);
}

module.exports.config = {
    name: "unlock",
    aliases: ["desbloquear", "unlockchannel", "destrancar"]
}