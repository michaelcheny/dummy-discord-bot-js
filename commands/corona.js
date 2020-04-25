const fetch = require("node-fetch");

const baseUrl = "https://coronavirus-19-api.herokuapp.com/";

module.exports = {
  name: "corona",
  description: "Stats for covid-19.",
  execute(message, args) {
    fetchStats(args).then((msg) => message.channel.send("```" + msg + "```"));
  },
};

const fetchStats = async (country = "china") => {
  if (country[0] === "country") {
    const res = await fetch(baseUrl + `countries/${country[1]}`);
    const data = await res.json();
    console.log(data);
    return thingy(data);
    // return data;
  } else {
    return `Try "!corona [country]"`;
  }
};

const thingy = (data) => {
  return `
    Country: ${data.country}
    Cases: ${data.cases}
    Cases today: ${data.todayCases}
    Deaths: ${data.deaths} 
    Deaths today: ${data.todayDeaths}
    Recovered: ${data.recovered}
    Active Cases: ${data.active}
    Total Tests: ${data.totalTests}
    Tests per million: ${data.testsPerOneMillion}
    `;
};

// fetches a random joke
// async function randomJoke(category = "any") {
//   if (
//     category[0] === "dark" ||
//     category[0] === "any" ||
//     category[0] === "miscellaneous" ||
//     category[0] === "programming"
//   ) {
//     try {
//       let response = await fetch(baseUrl + category);
//       let json = await response.json();
//       return processJoke(json);
//     } catch (error) {
//       console.log(error.message);
//       return error.message;
//     }
//   } else {
//     return `Try "!telljoke [category]" \nAvailable categories: any, dark, miscellaneous, and programming. \nWarning: dark is really dark`;
//   }
// }

// function processJoke(jsonObj) {
//   if (jsonObj.type === "single") {
//     return `${jsonObj.joke}`;
//   } else {
//     return `${jsonObj.setup}...\n   ${jsonObj.delivery}`;
//   }
// }
