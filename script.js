$(document).ready(function () {
  function artistInfo(artist) {
    var artist;
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
      $("#PLACEHOLDER FOR ID").text(response.artist.name);
      // var similar = response.artist.similar.artist;
      // $.each(similar, function(i) {
      //   var similarArtist = similar[i];
      //   var newDiv = $("<div>");
      //   newDiv.addClass("");
      //   newDiv.text(similarArtist);
      //   $("PLACEHOLDER").append(newDiv);
      // })
    });
  }

  function musicVideo(artist) {
    var artist;
    var queryURL =
      "https://itunes.apple.com/search?term=" +
      artist +
      "&country=US&entity=musicVideo";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(JSON.parse(response));
    });
  }
  // artistInfo();
  // musicVideo();

  $("#find-artist").on("click", function (event) {
    event.preventDefault();
    var artist = $("#artist-input").val();
    artistInfo(artist);
  });
});
