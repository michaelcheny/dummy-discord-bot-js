const fetch = require('node-fetch');

module.exports = {
  name: 'nbastats',
  description: 'Shows a random cat fact.',
  execute(message, args) {
    // Send error message if arguments not present
    if (!args.length)
      return message.channel.send(
        "You didn't provide any arguments. Try `!nbastats [First Name] [Last Name]` "
      );
    arg = args.join('%20');
    fetchPlayer(arg).then(player => {
      if (player === undefined) {
        message.channel.send('```Player not found.```');
      } else {
        buildPlayer(player).then(p => message.channel.send('```' + p + '```'));
      }
    });
  }
};

// retrieves json with name, id, height, weight
async function fetchPlayer(args) {
  try {
    let response = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${args}`
    );
    let json = await response.json();
    return json.data[0];
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

// builds the message for the requested player
async function buildPlayer(playerJson) {
  const id = playerJson.id;
  let stats = await fetchPlayerStats(id);
  console.log(playerJson.first_name + ' ' + playerJson.last_name);
  console.log(stats);
  if (stats === undefined)
    return "This player doesn't have stats for this season.";
  return `
    Stats for ${playerJson.first_name + ' ' + playerJson.last_name}
    Height: ${playerJson.height_feet +
      "'" +
      playerJson.height_inches +
      '"'}, Weight: ${playerJson.weight_pounds}
    Games Played: ${stats.games_played}, Avg Mins: ${stats.min}
    FG%: ${stats.fg_pct}, FG3%: ${stats.fg3_pct}, FT%: ${stats.ft_pct}
    Points: ${stats.pts}
    Rebound: ${stats.reb}
    Assist: ${stats.ast}
    Steals: ${stats.stl}
    Blocks: ${stats.blk}
    Turnovers: ${stats.turnover}`;
}

// retrieves json with player stats current season
async function fetchPlayerStats(id) {
  try {
    let response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
    );
    let json = await response.json();
    return json.data[0];
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}
