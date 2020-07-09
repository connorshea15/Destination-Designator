// This is my javascript File

// This function will accept the user input activity type and search the park database for parks associated with that activity
var getParkInfo = function() {
    var apiUrl = "https://developer.nps.gov/api/v1/activities/parks?q=hunting&api_key=SL6NUAYKuQc9Oci5uYIesi64ujlohyYU5Oshn7zb";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // pass the park code into the getParkCoordinates function
                getParkCoordinates(data.data[0].parks[0].parkCode)
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


getParkInfo();