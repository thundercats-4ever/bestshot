const searchBtn = document.getElementById("searchBtn");
const searchFirst = document.getElementById("searchFirst");
const searchLast = document.getElementById("searchLast");

function displayResults(stats) {
  console.log(stats);
  document.getElementById(
    "results"
  ).innerHTML = `<div>Average points per game: ${stats.pts}</div> <div>Average rebounds per game: ${stats.reb}</div>`;
}
function getApi(event) {
  // fetch request gets the data from the api
  event.preventDefault();
  let searchLast = document.querySelector("#searchLast").value.toLowerCase();
  let searchFirst = document.querySelector("#searchFirst").value.toLowerCase();
  let requestUrl = `https://www.balldontlie.io/api/v1/players/?search=${searchFirst}+${searchLast}`;

  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.data.length > 0) {
        const playerId = data.data[0].id;
        let playerUrl = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`;
        console.log(playerUrl);
        fetch(playerUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (playerData) {
            console.log(playerData);
            displayResults(playerData.data[0]);
          });
      } else {
        document.getElementById("results").innerHTML = "No results";
      }
    });
}

// Event Listeners
searchBtn.addEventListener("click", getApi);
