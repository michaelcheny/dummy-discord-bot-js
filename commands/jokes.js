const fetch = require("node-fetch");

const baseUrl = "https://sv443.net/jokeapi/category/"

module.exports = {
	name: 'telljoke',
	description: 'Returns a joke based on a category.',
	execute(message, args) {
		randomJoke(args).then(fact => message.channel.send("```" + fact + "```"));
	},
};

async function randomJoke(category){ // fetches a random joke
    console.log(category);
    try {
        console.log(baseUrl+category)
        let response = await fetch(baseUrl+category);
        let json = await response.json();
        
        return processJoke(json);
    } catch (error){
        console.log(error.message);
        return error.message;
    };
};

function processJoke(jsonObj){
    if (jsonObj.type ==="single"){
        return `${jsonObj.joke}`
    } else {
        return `    ${jsonObj.setup}...
        
    ${jsonObj.delivery}
        `
    };
};