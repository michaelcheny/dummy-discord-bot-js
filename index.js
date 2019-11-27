// Implement fetch API to our Node app.
const fetch = require("node-fetch");
// const fetchmodule =  require('./fetchmodule')

// Require config
// const config = require('./config.json');
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
    client.guilds.forEach(guild => {
        console.log(guild.name);
        guild.channels.forEach(channel => {
            console.log(` -${channel.name} ${channel.type} ${channel.id}`)
            // water collab bot-test: 649124226682585118
            // empty bot-test: 649170818974089226
        });
    });
    botChannels.forEach(channel => {
        let botChannel = client.channels.get(channel);
        // if (!!botChannel){
            botChannel.send("oooWeeee");
        // };
    });
});

// Logs in with the secret token
client.login(token);

// reply
client.on('message', message => {
	if ( !message.content.startsWith(prefix) || message.author === client.user){
        return;
    };
    // if (message.content.startsWith("!")){
        processCommand(message);
    // };
});

function processCommand(message){
    let fullCommand = message.content.substr(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let args = splitCommand.splice(1);

    if (primaryCommand == "help"){
        helpCommand(args, message);
    } else if (primaryCommand == "commands") {
        message.channel.send(commands);
    } else if (primaryCommand == "meow"){
        fetchCats().then(fact => message.channel.send(fact));
    } else if (primaryCommand == "woof"){
        randomDogPhoto().then(msg => message.channel.send(msg));
    } else {
        message.channel.send("I don't know that command.");
    };
};

function helpCommand(args, message){
    if (args.length == 0){
        message.channel.send("What? try `!help [topic]`")
    } else {

    };
};


// client.on('message', message => {
//     switch (message.content){
//         case `${prefix}commands`:
//             message.channel.send(commands);
//             break;
//         case `${prefix}meow`:
//             fetchCats().then(fact => message.channel.send(fact));
//             break;
//         case  `${prefix}woof`:
//             randomDogPhoto().then(msg => message.channel.send(msg));
//     }
// });


let commands = [
    "!meow - Random cat fact", 
    "!woof - Random Dog photo",
    
];



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

async function randomDogPhoto(){
    try {
        let response = await fetch('https://dog.ceo/api/breeds/image/random');
        let json = await response.json();
        return new Discord.Attachment(json.message);
    } catch (error) {
        return error.message
    };
};