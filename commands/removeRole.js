const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES", "MANAGE_MEMBERS")) return message.channel.send(`**${message.author} :x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Gerênciar Cargos\`.**`)

    let roleMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!roleMember) return message.channel.send(`**${message.author} :x: || Mencione um usuário válido!**`);

    let role = args.join(" ").slice(22);
    if(!role) message.channel.send(`**${message.author} :x: || Escreva o nome do cargo que você deseja remover de ${roleMember}!**`);

    let findRole = message.guild.roles.find(`name`, role);
    if(!findRole) return message.channel.send(`**${message.author} :x: || Não foi possivel encontrar este cargo!**`);

    if(roleMember.roles.has(findRole.id));
    (roleMember.removeRole(findRole.id));
    message.channel.send(`**O Cargo "${findRole.name}" foi removido com sucesso de ${roleMember}!**`)

}

module.exports.config = {
    name: "removeRole",
    aliases: ["removerCargo", "role-remove", "roleremove", "roleRemove"]
}