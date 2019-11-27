const fetch = require("node-fetch");
const Discord = require('discord.js');

// Fetch module

module.exports = {
    randCatFact: async function(){ // fetches a random cat fact
        try {
            let catRes = await fetch('https://cat-fact.herokuapp.com/facts');
            let catJson = await catRes.json();
            let rand = catJson.all[Math.floor(Math.random() * catJson.all.length)];
            return rand.text;
        } catch (error){
            console.log(error.message)
        };
    },
    randDogPhoto: async function(){ // fetches a random dog photo
        try {
            let response = await fetch('https://dog.ceo/api/breeds/image/random');
            let json = await response.json();
            return new Discord.Attachment(json.message);
        } catch (error) {
            return error.message;
        };
    },
    randCatPhoto: async function(){ // fetches a random cat photo
        try {
            let response = await fetch('https://api.thecatapi.com/v1/images/search');
            let json = await response.json();
            // console.log(json[0])
            return new Discord.Attachment(json[0].url);
        } catch (error) {
            return error.message;
        };
    },
};
