const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "purr",
  description: "Shows a random cat photo.",
  execute(message, args) {
    randomCatPhoto().then(fact => message.channel.send(fact));
  }
};

  // fetches a random cat photo
async function randomCatPhoto() {
  try {
    let response = await fetch("https://api.thecatapi.com/v1/images/search");
    let json = await response.json();
    return new Discord.Attachment(json[0].url);
  } catch (error) {
    return error.message;
  }
}
