const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let cargo = args[0]
  if(!cargo) return message.channel.send(`**${message.author} :x: || Você precisa dizer o nome do cargo que deseja criar!**`);
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author}:x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Gerênciar Cargos\`.**`);
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author} :x: || Eu não tenho as permissões necessárias para usar esse comando**`)

  message.guild.createRole({
    name: cargo,
    color: "GRAY"
  })

  message.channel.send(`**${message.author} O cargo \`"${cargo}"\` foi criado com sucesso!**`)
}

module.exports.config = {
  name: "createRole",
  aliases: ["cargo", "criarCargo", "newRole", "novoCargo"]
}