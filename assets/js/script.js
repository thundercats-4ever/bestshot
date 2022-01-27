const searchBtn = document.getElementById("searchBtn");
const searchFirst = document.getElementById("searchFirst");
const searchLast = document.getElementById("searchLast");
const teamDrop = document.getElementById("populateTeams");
const pageClick = document.querySelector(".js-page");
let teamId = 1;

function displayResults(stats) {
  console.log(stats);
  document.getElementById(
    "results"
  ).innerHTML = `<div>Average points per game: ${stats.pts}</div> <div>Average rebounds per game: ${stats.reb}</div><div>Average assists per game: ${stats.ast}</div>`;
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
    ).innerHTML += `<div class=""><div class="">${game.home_team.full_name}</div><div class="">${game.home_team_score}</div><div class=""> - </div> <div class="">${game.visitor_team.full_name}</div><div class=""> ${game.visitor_team_score}</div></div>`;
  });
}
function getTeams() {
  let teamsUrl = `https://www.balldontlie.io/api/v1/teams`;

  fetch(teamsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (teamData) {
      console.log(teamData);
      document.getElementById("populateTeams").innerHTML += `<option selected disabled>Choose Team</option>`;
      teamData.data.forEach((team) => {
        document.getElementById(
          "populateTeams"
        ).innerHTML += `<option data-id="${team.id}">${team.full_name}</option>`;
      });
    });
}
function getTeamsStats(page) {
  const pageNumber = page || 1;
  teamId =
    this.selectedOptions !== undefined
      ? this.selectedOptions[0].getAttribute("data-id")
      : teamId;
  let teamsUrl = `https://www.balldontlie.io/api/v1/games/?seasons[]=2018&team_ids[]=${teamId}&page=${pageNumber}`;
  document.getElementById("pager").innerHTML = "";
  fetch(teamsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (teamData) {
      for (i = 1; i < teamData.meta.total_pages + 1; i++) {
        document.getElementById(
          "pager"
        ).innerHTML += `<button class="js-page p-2 bg-orange m-2.5" data-page="${i}">${i}</button>`;
      }
      console.log(teamData);
      displayTeamResults(teamData.data);
    });
}
getTeams();

// Event Listeners
searchBtn.addEventListener("click", getApi);
teamDrop.addEventListener("change", getTeamsStats);
const buttons = document.querySelectorAll(".js-page");
buttons.forEach(function (currentBtn) {
  currentBtn.addEventListener("click", getTeamsStats);
});
document.body.addEventListener("click", function (event) {
  if (event.target.className.includes("js-page")) {
    getTeamsStats(event.target.getAttribute("data-page"));
  }
});