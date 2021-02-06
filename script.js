$(document).ready(function () {
  function artistInfo(artist) {
    var artist;
    var apiKey = "f02edefb391a21cbdfb37796f1e48351";
    var queryURL =
      "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
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

  function musicStory() {
    var consumerKey = "1de799c96e6b06f79913321f3b6f81098403b273";
    var secretKey = "0d1e93e6a3917345e6ee402cf5db08dcaa4fbc2f";
    var queryURL =
      "https://api.music-story.com/oauth/request_token?oauth_consumer_key=" +
      consumerKey +
      "&oauth_signature=" +
      secretKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (imgResponse) {
      console.log(imgResponse);
    });
  }

  // musicStory();

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
      var cardImg0 = discResponse.album[0].strAlbumThumb;
      var cardImg1 = discResponse.album[1].strAlbumThumb;
      $("#card-image0").attr("src", cardImg0);
      $("#card-image1").attr("src", cardImg1);
      for (i = 0; i < 10; i++) {
        var albumArt = discResponse.album[i].strAlbumThumb;
        var albumTitle = discResponse.album[i].strAlbum;
        var albumYear = discResponse.album[i].intYearReleased;
        var albumDescription = discResponse.album[i].strDescriptionEN;
        console.log(albumArt);
        var artID = $("#coverart" + i);
        var nameID = $("#disc-title" + i);
        var yearID = $("#disc-year" + i);
        var desccriptionID = $("#disc-desc" + i);
        var artID = $("#coverart" + i);
        artID.attr("src", albumArt);
        nameID.html(albumTitle);
        yearID.html(albumYear);
        desccriptionID.html(albumDescription);
      }
    });
  }

  function load() {
    var artistsSearched = JSON.parse(localStorage.getItem("searches"));
    if (artistsSearched) {
      $("#search-items").empty();
      $.each(artistsSearched, function (i) {
        var artist = artistsSearched[i];
        var newP = $("<p>");
        newP.text(artist);
        $("#search-items").append(newP);
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

  $("#recent-searches").on("click", function (event) {
    event.preventDefault();
    load();
  });

  $(document).on("click", ".sim-artist", function () {
    var artist = $(this).text();
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

  // Modal initialize
  $(".modal").modal();

  load();
});
