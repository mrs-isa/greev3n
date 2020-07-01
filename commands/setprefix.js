const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`**${message.author}:x: || Você não possui permissões o suficiente para utilizar este comando! Para usar esse comando você precisa da permissão \`Gerênciar Servidor\`.**`);
    if(!args[0] || args[0 == "help"]) return message.channel.send(`**${message.author} Você também precisa incluir o novo prefixo na mensagem!**`);

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if(err) console.log(err)
    });

    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Novo prefixo!")
    .setDescription(`Prefixo alterado para: ${args[0]}`);

    message.channel.send(embed);
}

module.exports.config = {
    name: "setprefix",
    aliases: ["set-prefix", "prefix", "prefixo"]
}