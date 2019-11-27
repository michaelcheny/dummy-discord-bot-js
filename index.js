// Implement fetch API to our Node app.
const fetch = require("node-fetch");
// const fetchmodule =  require('./fetchmodule')

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
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command == "help"){
        helpCommand(args, message);
    } else if (command == "commands") {
        message.channel.send(commands);
    } else if (command == "meow"){
        fetchCats().then(fact => message.channel.send(fact));
    } else if (command == "woof"){
        randomDogPhoto().then(attachment => message.channel.send(attachment));
    } else if (primaryCommand == "purr"){
        randomCatPhoto().then(attachment => message.channel.send(attachment));
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

// returns a random cat fact
async function fetchCats(){
    try {
        let catRes = await fetch('https://cat-fact.herokuapp.com/facts');
        let catJson = await catRes.json();
        let randomCatFact = catJson.all[Math.floor(Math.random() * catJson.all.length)];
        return randomCatFact.text;
    } catch (error){
        console.log(error.message);
        return error.message;
    };
}; 

// returns a random dog pic
async function randomDogPhoto(){
    try {
        let response = await fetch('https://dog.ceo/api/breeds/image/random');
        let json = await response.json();
        return new Discord.Attachment(json.message);
    } catch (error) {
        return error.message;
    };
};

// returns a random cat pic
async function randomCatPhoto(){
    try {
        let response = await fetch('https://api.thecatapi.com/v1/images/search');
        let json = await response.json();
        // console.log(json[0])
        return new Discord.Attachment(json[0].url);
    } catch (error) {
        return error.message;
    };
};