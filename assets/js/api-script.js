// Object that will hold all of the current park's info
var currentPark = {
    name:"",
    states:"",
    url:"",
    temp:"",
    weather:""
};

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
                console.log(currentPark);
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
                console.log(data); 
                // grab the parks latitude and longitude, which will be passed to the weather API
                console.log("lat = " + data.data[0].latitude);
                console.log("long = " + data.data[0].longitude);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

getParkInfo(userInput);