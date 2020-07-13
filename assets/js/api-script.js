// Object that will hold all of the current park's info
var currentPark = {
    name:"",
    states:"",
    url:"",
    imageUrl:"",
    temp:"",
    weather:""
};
//Local storage variable to hold array of saved park objects
var savedParks = [];
// DOM representation of the see saved parks button
var savedParkButtonEl = document.getElementById("see-saved-parks");
// variable to represent the saved park Modal
var savedParkModalEl = document.getElementById("saved-park-modal");
// variable for the modal close button
var modalCloseEl = document.getElementById("modal-close");
// Saved Park Modal list area 
var savedParkList = document.getElementById("park-list");
// This is just to mimic passing user input into the getParkInfo function
var userInput = "hunting";

// This function will accept the user input activity type and search the park database for parks associated with that activity
var getParkInfo = function(userInput) {
    var apiUrl = "https://developer.nps.gov/api/v1/activities/parks?q=" + userInput + "&api_key=SL6NUAYKuQc9Oci5uYIesi64ujlohyYU5Oshn7zb";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // Save the array of park objects in variable parkArr
                var parkArr = data.data[0].parks;
                // I need a random number between 0 and the length of the parkArr
                var randomIndex = Math.floor(Math.random() * parkArr.length);
                // store the name of the current park in this variable 
                currentPark.name = parkArr[randomIndex].fullName;
                // store the name of the current park's state in this variable 
                currentPark.states = parkArr[randomIndex].states;
                // store the current park's url
                currentPark.url = parkArr[randomIndex].url;
                // pass the park code into the getParkCoordinates function
                getParkCoordinates(parkArr[randomIndex].parkCode)
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// pass the park code into the function to fetch the park api
var getParkCoordinates = function(parkCode) {
    var apiUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=SL6NUAYKuQc9Oci5uYIesi64ujlohyYU5Oshn7zb";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // Change object property to reflect url of image of park
                currentPark.imageUrl = data.data[0].images[0].url;
                // grab the parks latitude and longitude, which will be passed to the weather API
                getParkWeather(data.data[0].latitude, data.data[0].longitude);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// pass lat and long of park to weather API to get current weather and description
var getParkWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily&units=imperial&appid=055086f19492c21b798cb63cdcd21457"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // Set the current parks temperature to api temperature
                currentPark.temp = data.current.temp;
                // Set the current park's weather description to the api description
                currentPark.weather = data.current.weather[0].description;
                // This is here for now for testing purposes. 
                // It will eventually only execute after a button click
                saveParks();
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// Pushing the save button will call this function to remember the parks name and url
var saveParks = function() {
    var savedParkInfo = {
        name: currentPark.name,
        url: currentPark.url
    }; 
    // Push new park object onto the end of our savedParks array 
    savedParks.push(savedParkInfo);
    localStorage.setItem("parkInfo", JSON.stringify(savedParks));
};

var loadSavedParks = function() {
    savedParks = JSON.parse(localStorage.getItem("parkInfo"));

    // if local storage is null, recreate array to hold saved parks
    if (!savedParks) {
        savedParks = [];
    }
};

// Display saved parks in the modal
var displaySavedParks = function() {
    savedParkList.innerHTML = "";
    if (savedParks.length === 0) {
        savedParkList.textContent = "You have no saved parks!"
    } else {
        for (i = 0; i < savedParks.length; i++) {
            // create list element to hold saved park name
            var newParkEl = document.createElement("li");
            // create link element to put in list element
            var newParkLinkEl = document.createElement("a");
            newParkLinkEl.textContent = savedParks[i].name;
            newParkLinkEl.href = savedParks[i].url;
            newParkEl.appendChild(newParkLinkEl);
            savedParkList.appendChild(newParkEl);
        }
    }
};

// Open saved park modal when button is clicked
savedParkButtonEl.onclick = function() {
    savedParkModalEl.style.display = "block";
    displaySavedParks();
}

// Close saved park modal when button is clicked
modalCloseEl.onclick = function() {
    savedParkModalEl.style.display = "none";
}

// This will be triggered by a clicking event
getParkInfo(userInput);
loadSavedParks();

// All of the properties of currentPark object will be displayed on the screen.
