const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

    let coins = require("./coins.json");
const { disconnect } = require("process");

bot.queues = new Map();

fs.readdir("./commands/", (err, files) => {
    
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        return console.log("Não foi possivel encontrar o comando")
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        console.log(`O Comando ${f} foi carregado com sucesso!`)
        if(pull.config && pull.config.name) {
        bot.commands.set(pull.config.name, pull)
        }

        if(pull.config && pull.config.aliases) 
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("ready", () => {
    console.log(`O Bot ficou online com sucesso! Está atualmente em ${bot.guilds.size} servidores, em ${bot.channels.size} canais e com ${bot.users.size} usuários.`);
    bot.user.setActivity(`Estou em ${bot.guilds.size} servidores`, {type: "STREAMING"});
});


bot.on("guildCreate", async guild => {
    console.log(`O Bot foi adicionado no servidor: ${guild.name} (ID: ${guild.id})`);
    bot.user.setActivity(`Estou em ${bot.guilds.size} servidores`, {type: "STREAMING"});

    guild.createRole({
        name: "Mutado",
        color: "GRAY"
    })
});

bot.on("guildDelete", guild => {
    console.log(`O Bot foi removido do servidor: ${guild.name} (ID: ${guild.id})`);
    bot.user.setActivity(`Estou em ${bot.guilds.size} servidores`, {type: "STREAMING"});
}); 

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        }
    }

    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 1) +1;
    let baseAmt = Math.floor(Math.random() * 1) +1;

    if(coinAmt === baseAmt){
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        });
    }

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;

    let arquivocmd = bot.commands.get(command.slice(config.prefix.length));
    if(arquivocmd) arquivocmd.run(bot, message, args);

    let commandfile = bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    if(commandfile) commandfile.run(bot, message, args);

});


bot.login(config.token);