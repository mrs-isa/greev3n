const Discord = require("discord.js");
const ascii = require("ascii-art");

module.exports.run = (bot, message, args) => {
    ascii.font(args.join(" "), 'Doom', function(rendered) {
        rendered = rendered.trimRight();

        if(rendered.lenght > 2000) return message.channel.send(`**${message.author} Essa frase é muito longa! :(**`);

        message.channel.send(rendered, {
            code: 'md'
        });
    });
}

module.exports.config = {
    name: "ascii",
    aliases: []
}