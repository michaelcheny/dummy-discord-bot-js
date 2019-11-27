// Implement fetch API to our Node app.
const fetch = require("node-fetch");
const fetchmodule =  require('./fetchmodule')

// Require config
const { prefix, token } = require('./config.json');

// Requires the discord node modules
const Discord = require('discord.js');
const client = new Discord.Client();

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
        // if (!!botChannel){
            botChannel.send("OOOooWeeee! Bot activated!");
        // };
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
    const command = args.shift().toLowerCase();

    if (command == "help"){
        helpCommand(args, message);
    } else if (command == "commands") {
        message.channel.send(commands);
    } else if (command == "meow"){
        fetchmodule.randCatFact().then(fact => message.channel.send(fact));
    } else if (command == "woof"){
        fetchmodule.randDogPhoto().then(attachment => message.channel.send(attachment));
    } else if (command == "purr"){
        fetchmodule.randCatPhoto().then(attachment => message.channel.send(attachment));
    } else {
        message.channel.send("I don't know that command.");
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

