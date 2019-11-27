const fetch = require("node-fetch");

// Require config
// const config = require('./config.json');
const { prefix, token } = require('./config.json');

// Requires the discord node modules
const Discord = require('discord.js');
const client = new Discord.Client();

// Logs Ready as soon as bot is ready.
client.once('ready', () => {
	console.log('Ready!');
});

// Logs in with the secret token
client.login(token);

// reply
client.on('message', message => {
	if (message.content === `${prefix}ping`) {
        message.channel.send('pong');
    } else if (message.content === `${prefix}meow`){
        fetchCats().then(fact => message.channel.send(fact)); 
    };
});

async function fetchCats(){
    try {
        let catRes = await fetch('https://cat-fact.herokuapp.com/facts');
        let catJson = await catRes.json();
        let rand = catJson.all[Math.floor(Math.random() * catJson.all.length)];
        randomFact = rand.text;
        return randomFact;
    } catch (error){
        console.log(error.message)
    };
}; 
