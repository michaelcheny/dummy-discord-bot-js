// Require config
const { prefix, token } = require('./config.json');

// Requires the discord node modules
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
};

// bot channels
const botChannels = ["649170818974089226"];
// "649124226682585118" - water collab

// Logs Ready as soon as bot is ready.
client.once('ready', () => {
    console.log('Bot: ' + client.user.tag);
    // client.guilds.forEach(guild => {
    //     console.log(guild.name);
    //     guild.channels.forEach(channel => {
    //         console.log(` -${channel.name} ${channel.type} ${channel.id}`)
    //     });
    // });
    botChannels.forEach(channel => {
        let botChannel = client.channels.get(channel);
        botChannel.send("OOOooWeeee! Bot activated!");
    });
});

// Logs in with the secret token
client.login(token);

// reply
client.on('message', message => {
	if ( !message.content.startsWith(prefix) || message.author.bot ) return;
    processCommand(message);
});

// processes the requested command 
function processCommand(message){
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    };
};

// help command takes multiple args
function helpCommand(args, message){
    if (args.length == 0){
        message.channel.send("What? try `!help [topic]`");
    } else {

    };
};

// commands
let commands = [
    "!meow - Random cat fact", 
    "!woof - Random dog photo",
    "!purr - Random cat photo"
];

