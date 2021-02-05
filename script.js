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

  function discog(artist) {
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
      for (i = 0; i < 10; i++) {
        var albumArt = discResponse.album[i].strAlbumThumb;
        console.log(albumArt);
        var artID = $("#coverart" + i);
        console.log(artID);
        artID.attr("src", albumArt);
      }
    });
  }

  function load() {
    var artistsSearched = JSON.parse(localStorage.getItem("searches"));
    if (artistsSearched) {
      $.each(artistsSearched, function (i) {
        var artist = artistsSearched[i];
        var newLi = $("PLACEHOLDER");
        newLi.addClass("PLACEHOLDER");
        newLi.text(artist);
        $("PLACEHOLDER").append(newLi);
      });
    }
  }

  function store(artist) {
    var artistsSearched = JSON.parse(localStorage.getItem("searches"));
    if (!artistsSearched) {
      artistsSearched = [];
    }
    if (artistsSearched.includes(artist) === false) {
      artistsSearched.push(artist);
    }
    localStorage.setItem("searches", JSON.stringify(artistsSearched));
  }

  function redirect(artist) {
    window.open("https://last.fm/music/" + artist, "_blank");
  }

  $("#find-artist").on("click", function (event) {
    event.preventDefault();
    var artist = $("#artist-input").val();
    artistInfo(artist);
    discog(artist);
    store(artist);
  });

  // Floating Action Button
  $(".fixed-action-btn").floatingActionButton();

  $("#download-button").on("click", function (event) {
    event.preventDefault();
    var artist = $("#artist-input").val();
    redirect(artist);
  });

  // Discography Carousel
  $(".carousel").carousel();

  load();
});
