const fetch = require("node-fetch");

const baseUrl = "https://coronavirus-19-api.herokuapp.com/";

module.exports = {
  name: "corona",
  description: "Stats for covid-19.",
  execute(message, args) {
    if (!args.length) {
      fetchGlobal().then((data) =>
        message.channel.send("```fix" + data + "```")
      );
    } else {
      fetchStats(args).then((msg) =>
        message.channel.send("```fix" + msg + "```")
      );
    }
  },
};

const fetchGlobal = async () => {
  const res = await fetch(baseUrl + "all");
  const data = await res.json();
  console.log(data);
  return `
    Global cases: ${data.cases}
    Global deaths: ${data.deaths}
    Global recovered: ${data.recovered}
  `;
};

const fetchStats = async (country = "china") => {
  const res = await fetch(baseUrl + `countries/${country}`);
  const data = await res.json();
  // console.log(data);
  return `
    ${data.country}
    cases: ${data.cases} | today: ${data.todayCases} | active: ${data.active}
    cases per million: ${data.casesPerOneMillion}
    deaths: ${data.deaths} | today: ${data.todayDeaths}
    recovered: ${data.recovered} | critical: ${data.critical}
    total tests: ${data.totalTests} | tests/million: ${data.testsPerOneMillion} 
  `;
};

// const thingy = (data) => {
//   return `
//     ${data.country}

//     cases: ${data.cases} | today: ${data.todayCases} | active: ${data.active}
//     cases per million: ${data.casesPerOneMillion}
//     deaths: ${data.deaths} | today: ${data.todayDeaths}
//     recovered: ${data.recovered} | critical: ${data.critical}
//     total tests: ${data.totalTests} | tests/million: ${data.testsPerOneMillion}
//     `;
// };
