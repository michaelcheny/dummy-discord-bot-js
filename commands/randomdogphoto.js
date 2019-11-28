const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
	name: 'woof',
	description: 'Shows a random dog photo.',
	execute(message, args) {
		randomDogPhoto().then(fact => message.channel.send(fact));
	},
};

async function randomDogPhoto(){ // fetches a random dog photo
    try {
        let response = await fetch('https://dog.ceo/api/breeds/image/random');
        let json = await response.json();
        return new Discord.Attachment(json.message);
    } catch (error) {
        return error.message;
    };
};