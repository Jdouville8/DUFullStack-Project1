$(document).ready(function () {
  function artistInfo() {
    var artist = "Sunami";
    var apiKey = "f02edefb391a21cbdfb37796f1e48351";
    var queryURL =
      "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
      artist +
      "&api_key=" +
      apiKey +
      "&format=json";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  }
  function musicVideo() {
    var term = "Kanye West Runaway";
    var queryURL =
      "https://itunes.apple.com/search?term=" +
      term +
      "&country=US&entity=musicVideo";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(JSON.parse(response));
    });
  }
  artistInfo();
  musicVideo();
});
