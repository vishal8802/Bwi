//utility function for fetching series details

const { db, Search } = require("./db/db");

const fetch = require("node-fetch");

const api_key = `44b82e083cb588f7a95593c21b09a94a`;
const api_provider = `https://api.themoviedb.org/`;

const getTime = async search => {
  //   let url2 = `${api_provider}/3/search/multi?api_key=${api_key}&query=${search}&include_adult=true&page=1`;
  search = search.replace(/ /g, "%20");

  let url = `
 https://api.themoviedb.org/3/search/multi?api_key=44b82e083cb588f7a95593c21b09a94a&language=en-US&query=${search}&page=1&include_adult=true`;
  //   console.log(url2);
  console.log(url);
  const resolve_url = await fetch(url);

  let json = await resolve_url.json();
  //   console.log(json);
  if (json.total_results == 0) {
    return `no result found :(`;
  }
  //   console.log(json);
  const resolve_url_episodes = await fetch(
    `${api_provider}/3/tv/${json.results[0].id}?api_key=${api_key}`
  );
  json = await resolve_url_episodes.json();
  return json;
};

async function saveSearch(data) {
  let result = await Search.findOne({
    where: {
      name: data
    }
  });
  if (result) {
    Search.update(
      {
        count: result.count + 1
      },
      {
        where: {
          name: data
        }
      }
    );
    return;
  }
  Search.create({
    name: data,
    count: 1
  });
}
async function getMostSearch() {
  let x = await Search.findAll({
    limit: "6",
    order: [["count", "DESC"]]
  });
  return x;
}

module.exports = {
  getTime,
  saveSearch,
  getMostSearch
};
