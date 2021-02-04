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
      console.log(response)
      $("#PLACEHOLDER FOR ID").text(response.artist.name);

      // !!!! Maybe JSON Parse or stringify to pull tag from bio summary? As of right now it is a part of the text !!!
      $("#artist-bio").text(response.artist.bio.summary);
      var similar = response.artist.similar.artist;
      // For loop that iterates through artist object to pull each similar artist
      $.each(similar, function(i) {
        var similarArtist = response.artist.similar.artist[i].name;
        var newDiv = $("<li>");
        newDiv.addClass("sim-artist");
        newDiv.text(similarArtist);
        $("#similar-artists").append(newDiv);
      })
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
