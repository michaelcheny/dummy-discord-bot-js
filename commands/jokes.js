const fetch = require('node-fetch');

const baseUrl = 'https://sv443.net/jokeapi/category/';

module.exports = {
  name: 'telljoke',
  description: 'Returns a joke based on a category.',
  execute(message, args) {
    randomJoke(args).then(msg => message.channel.send('```' + msg + '```'));
  }
};

// fetches a random joke
async function randomJoke(category = 'any') {
  if (
    category[0] === 'dark' ||
    category[0] === 'any' ||
    category[0] === 'miscellaneous' ||
    category[0] === 'programming'
  ) {
    try {
      let response = await fetch(baseUrl + category);
      let json = await response.json();
      return processJoke(json);
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  } else {
    return `Try "!telljoke [category]" \nAvailable categories: any, dark, miscellaneous, and programming. \nWarning: dark is really dark`;
  }
}

function processJoke(jsonObj) {
  if (jsonObj.type === 'single') {
    return `${jsonObj.joke}`;
  } else {
    return `${jsonObj.setup}...\n   ${jsonObj.delivery}`;
  }
}
