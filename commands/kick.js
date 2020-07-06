const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let membro = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!membro) return message.channel.send(`**${message.author} :x: || Mencione um usuário válido!**`)
    if(membro === message.member) return message.channel.send(`**${message.author} Você não pode se kickar!**`);

    let motivo = args.slice(1).join(" ");
    if(!motivo){
        motivo = "Não específicado"
    }

    if(!message.guild.me.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send(`**${message.author} :x: || Eu não tenho as permissões necessárias para usar esse comando**`)
   
    let embed = new Discord.RichEmbed()
    .setAuthor(`${membro.user.username} FOI KICKADO`, membro.displayAvatURL)
    .addField("Motivo:", motivo)
    .setTimestamp()
    .setFooter("GREEV3N", bot.user.displayAvatURL);

    message.channel.send(embed);
    membro.kick();


}

module.exports.config = {
    name: "kick",
    aliases: ["expulsar", "kickar"]
}