const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author} :x: ||    Você não**`);
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author} :x: || Eu não tenho permissões o suficiente para efetuar esse comando!**`);

    let cargo = message.guild.roles.find(r => r.name == args[0]) || message.guild.roles.get(args[0]) || message.mentions.roles.first();
    if(!cargo){
        message.channel.send(`**${message.author} :x: || Mencione o ID ou o nome do cargo que você deseja excluir!**`)
    } else {
    message.channel.send(`**${message.author} O cargo \`"${cargo.name}"\` foi excluido com sucesso!**`)
    cargo.delete();
}
}

module.exports.config = {
    name: "deleteRole",
    aliases: []
}