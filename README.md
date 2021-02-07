# DUFullStack-Project1

# Description

The Music Locator was created with the goal of enabling the user to search for an artist and find more information about them as well as introduce the use to similar artists.

# Key features

_Search bar_

This is where the user inputs a chosen artist name in order to display a collection of information and interactive elements throughout the page. The response object created by the ajax calls in the Javascript are determined by the search term, information from those response objects is then pulled into the HTML to be displayed for the user

_Artist Bio_

Read from the Last FM API, the artist bio is some general information on the background of the act.

_Last FM Listeners and Play Count_

Read from the Last FM API, these are statistics displaying the number of listeners and plays of Last FM service users

_Similar Artists_

Here a list of similar artists is displayed based on the search query. All of these results can be clicked to replace the search term with the artist clicked and show results for that artist

_Recent Searches_
Local storage is used to store all previous artist searches as they are executed. The "recent searches" button will populate a modal to the screen holding a list of all searches that have been stored.

_Floating Action button_
At the bottom right of the screen is a Floating Action Button that holds a green download icon button, clicking that will bring the user to the artist's page on the Last FM website.

_Discography Carousel_
This carousel uses the audioDB API to display the cover art of 8 albums by the searched artist. Each carousel item, when clicked, will display a modal that contains the album name, year and description.

# Deployed Website

[Screenshot1] (DUFullStack-Project1/images/Deployed-Website-1.png)
[Screenshot2] (DUFullStack-Project1/images/Deployed-Website-2.png)

_Deployed Website Link_
https://jdouville8.github.io/DUFullStack-Project1/
