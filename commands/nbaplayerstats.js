const fetch = require("node-fetch");


module.exports = {
	name: 'nbastats',
	description: 'Shows a random cat fact.',
	execute(message, args) {
        arg = args.join("%20")
        console.log(args)
        console.log(arg)
		fetchPlayerStats(arg).then(fact => message.channel.send("```" + fact + "```"));
	},
};

async function fetchPlayerStats(args){ // fetches a random cat fact
    try {
        let response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${args}`);
        let json = await response.json();
        console.log(json.data)
        // return rand.text;
    } catch (error){
        console.log(error.message);
        return error.message;
    };
};