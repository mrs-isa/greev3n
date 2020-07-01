const Discord = require("discord.js");
 
exports.run = (bot, message, args) => {

      if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) return message.channel.send(`**${message.author}:x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Banir membros\`.**`)
    var membro = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!membro) return message.channel.send(`**${message.author} :x: || Por favor mencione um usuário para banir!**`)
    if(membro === message.member) return message.channel.send(`**${message.author} Você não pode banir você mesmo!**`)

    if(membro.hasPermission("ADMINISTRATOR", "BAN_MEMBERS")) return message.channel.send(`**${message.author} Você não pode banir um ADM**`)

    let motivo = args.slice(1).join(" ")
    if(!motivo){
        motivo = "Não específicado"
    }

    if(!message.guild.me.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) return message.channel.send(`**${message.author} :x: || Eu não tenho permissões o suficiente para efetuar esse comando!**`)

    let embed = new Discord.RichEmbed()
    .setDescription(`Você realmente deseja banir ${membro}?`)
    .setColor("DARK_RED")
    .setTimestamp();
    message.channel.send(`${message.author}`, embed).then(msg => {
        msg.react("✅");
        let filtro = (reaction, usuario) => reaction.emoji.name = "✅" && usuario.id === message.author.id;
        const coletor = msg.createReactionCollector(filtro, {max: 1});

        coletor.on("collect", em => {
            em.remove(message.author.id);

            let embed2 = new Discord.RichEmbed()
            
            .setAuthor(`${membro.user.tag} FOI BANIDO`)
            .setColor("DARK_RED")
            .addField("**Motivo:**", motivo)

            message.channel.send(`${message.author}`, embed2)
            membro.ban();
        });
    });
}   


module.exports.config = {
    name: "ban",
    aliases: ["banir", "banmember", "ban-member", "banirmembro", "banir-membro"]
}