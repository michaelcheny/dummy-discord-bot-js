const fetch = require("node-fetch");


module.exports = {
	name: 'meow',
	description: 'Shows a random cat fact.',
	execute(message, args) {
		randomCatFact().then(fact => message.channel.send("```" + fact + "```"));
	},
};

async function randomCatFact(){ // fetches a random cat fact
    try {
        let catRes = await fetch('https://cat-fact.herokuapp.com/facts');
        let catJson = await catRes.json();
        let rand = catJson.all[Math.floor(Math.random() * catJson.all.length)];
        return rand.text;
    } catch (error){
        console.log(error.message)
    };
};