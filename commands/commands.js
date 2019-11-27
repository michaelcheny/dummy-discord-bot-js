module.exports = {
	name: 'commands',
	description: 'Shows the available commands.',
	execute(message, args) {
		message.channel.send(commands);
	},
};

// commands
let commands = [
    "```!meow - Random cat fact", 
    "!woof - Random dog photo",
    "!purr - Random cat photo```"
];
