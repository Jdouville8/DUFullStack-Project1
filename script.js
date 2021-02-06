// wait for html to load completely
$(document).ready(function () {
  // this function queries last.fm for artist info and displays it in the HTML
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
      $("#artist-name").text(response.artist.name);
      // use split method to trim the response value a bit
      var biography = response.artist.bio.summary.split("<")[0];
      $("#artist-bio").text(biography);
      var similar = response.artist.similar.artist;
      $("#lfm-playcount").text(response.artist.stats.playcount);
      $("#lfm-listeners").text(response.artist.stats.listeners);

      // empty the container so we can append
      $("#similar-artists").empty();

      // For loop that iterates through artist object to append similar artists
      $.each(similar, function (i) {
        var similarArtist = response.artist.similar.artist[i].name;
        var newLi = $("<li>");
        newLi.addClass("sim-artist");
        newLi.text(similarArtist);
        $("#similar-artists").append(newLi);
      });
    });
  }

  // this function queries audioDB for an artist's discography and appends the art and information into the carousel
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
      // this for loop iterates through information provided with each album in the discography
      for (i = 0; i < 8; i++) {
        // make variable for album art, year, title, and description
        var albumArt = discResponse.album[i].strAlbumThumb;
        var albumTitle = discResponse.album[i].strAlbum;
        var albumYear = discResponse.album[i].intYearReleased;
        var albumDescription = discResponse.album[i].strDescriptionEN;

        var artID = $("#coverart" + i);
        var nameID = $("#disc-title" + i);
        var yearID = $("#disc-year" + i);
        var descriptionID = $("#disc-desc" + i);
        var artID = $("#coverart" + i);

        artID.attr("src", albumArt);
        nameID.html(albumTitle);
        yearID.html(albumYear);
        descriptionID.html(albumDescription);
      }
    });
  }

  // load function grabs recent searches from local storage and appends them in a modal
  function load() {
    var artistsSearched = JSON.parse(localStorage.getItem("searches"));
    // only run if a local storage object is found
    if (artistsSearched) {
      // empty the container before we append
      $("#search-items").empty();

      $.each(artistsSearched, function (i) {
        var artist = artistsSearched[i];
        var newP = $("<p>");
        newP.text(artist);
        $("#search-items").append(newP);
      });
    }
  }

  // store function saves the current search to local storage
  function store(artist) {
    var artistsSearched = JSON.parse(localStorage.getItem("searches"));
    // if array does not exist, make one
    if (!artistsSearched) {
      artistsSearched = [];
    }
    // if the artist is in the array already, skip it
    if (artistsSearched.includes(artist) === false) {
      artistsSearched.push(artist);
    }
    localStorage.setItem("searches", JSON.stringify(artistsSearched));
  }

  // this function builds a last.fm link and opens a new tab
  function redirect(artist) {
    window.open("https://last.fm/music/" + artist, "_blank");
  }

  // this button listener is for the Search Artist button. calls artistInfo, discog, and store funtions and passes in artist
  $("#find-artist").on("click", function (event) {
    event.preventDefault();
    var artist = $("#artist-input").val();
    artistInfo(artist);
    discog(artist);
    store(artist);
  });

  // recent searches button calls load function
  $("#recent-searches").on("click", function (event) {
    event.preventDefault();
    load();
  });

  // click listener for similar artist list items. clicking an artist name works the same way as typing it in the search and pressing enter
  $(document).on("click", ".sim-artist", function () {
    var artist = $(this).text();
    artistInfo(artist);
    discog(artist);
    store(artist);
  });

  // Floating Action Button
  $(".fixed-action-btn").floatingActionButton();

  // "download" button within the floating action button. does not download but in fact opens a last.fm link in a new tab
  $("#download-button").on("click", function (event) {
    event.preventDefault();
    var artist = $("#artist-input").val();
    redirect(artist);
  });

  // Discography Carousel
  $(".carousel").carousel();

  // Modal initialize
  $(".modal").modal();

  // run load function on page startup
  load();
});
