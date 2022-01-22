function getApi() {
  // fetch request gets the data from the api
  let requestUrl = "https://www.balldontlie.io/api/v1/players/237";
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getApi();
// Choose a team from dropdown TODO

// Type PLayer name and click submit TODO

// Event Listeners
