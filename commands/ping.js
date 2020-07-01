const Discord = require("discord.js");

exports.run = (bot, message, args) => {
    
    message.channel.send(`**${message.author} :ping_pong: Pong! Meu ping atual é de: \`${Math.round(bot.ping)}ms\`**`)

}

module.exports.config = {
    name: "ping",
    aliases: ["pong", "pingu", "gong"]
}