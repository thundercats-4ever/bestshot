const searchBtn = document.getElementById("searchBtn");
const searchFirst = document.getElementById("searchFirst");
const searchLast = document.getElementById("searchLast");
const teamDrop = document.getElementById("teams");

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

function displayTeamResults(stats) {
  console.log(stats);
  document.getElementById("results").innerHTML = "";
  stats.forEach((game) => {
    document.getElementById(
      "results"
    ).innerHTML += `<div>${game.home_team.full_name}: ${game.home_team_score} - ${game.visitor_team.full_name}: ${game.visitor_team_score}</div>`;
  });
}
function getTeams() {
  const teamId = this.selectedOptions[0].getAttribute("data-id");
  let teamsUrl = `https://www.balldontlie.io/api/v1/games/?seasons[]=2018&team_ids[]=${teamId}`;

  fetch(teamsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (teamData) {
      console.log(teamData);
      displayTeamResults(teamData.data);
    });
}

// Event Listeners
searchBtn.addEventListener("click", getApi);
teamDrop.addEventListener("change", getTeams);

// Event Listeners
// Choose a team from dropdown TODO

// Type PLayer name and click submit TODO

// Event Listeners
// Choose a team from dropdown TODO

// Type PLayer name and click submit TODO
