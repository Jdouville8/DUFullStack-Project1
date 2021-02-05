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
    // comment
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#artist-name").text(response.artist.name);

      // !!!! Maybe JSON Parse or stringify to pull tag from bio summary? As of right now it is a part of the text !!!
      var biography = response.artist.bio.summary.split("<")[0];
      $("#artist-bio").text(biography);
      var similar = response.artist.similar.artist;

      $("#similar-artists").empty();
      // For loop that iterates through artist object to pull each similar artist
      $.each(similar, function (i) {
        var similarArtist = response.artist.similar.artist[i].name;
        var newLi = $("<li>");
        newLi.addClass("sim-artist");
        newLi.text(similarArtist);
        $("#similar-artists").append(newLi);
      });
      
    });
  }

  function audioDB(artist) {
    var apiKey = "523537";
    var queryURL =
      "https://theaudiodb.com/api/v1/json/" +
      apiKey +
      "/searchalbum.php?s=" +
      artist;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (discResponse) {
      console.log(discResponse);
    });
  }

  function redirect(artist) {
    window.open("https://last.fm/music/" + artist, "_blank");
  }

  $("#find-artist").on("click", function (event) {
    event.preventDefault();
    var artist = $("#artist-input").val();
    artistInfo(artist);
    audioDB(artist);
  });

  // Floating Action Button
  $(".fixed-action-btn").floatingActionButton();

  $("#download-button").on("click", function (event) {
    event.preventDefault();
    var artist = $("#artist-input").val();
    redirect(artist);
    audioDB(artist);
  });
});
