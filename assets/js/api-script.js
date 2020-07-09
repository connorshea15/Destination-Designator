// This is my javascript File


var getParkInfo = function() {
    var apiUrl = "https://developer.nps.gov/api/v1/activities/parks?q=hunting&api_key=SL6NUAYKuQc9Oci5uYIesi64ujlohyYU5Oshn7zb";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

getParkInfo();