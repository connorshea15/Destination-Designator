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
// This is just to mimic passing user input into the getParkInfo function
var userInput = "fishing";

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
        //Creating an if statement to match drop-down items with the userInput field to place selected value into fetch search
        if(userSelect = "fishing"){
            var userInput = "fishing"}
        else{};
        if(userSelect = "hiking"){
            var userInput = "hiking"
        }
        else{};
        if(userSelect = "hunting"){
            var userInput = "hunting"
        }
        else{};
        if(userSelect = "climbing"){
            var userInput = "climbing"
        }
        else{};


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


// This will be triggered by a clicking event
// $("modBut")
// (getParkInfo)
loadSavedParks();

// All of the properties of currentPark object will be displayed on the screen.
// If there are objects in the savedParks array, they will be displayed on the page as well
// I'm thinking maybe we do that with a modal that says "see saved parks" and then the list 
// pops up in a modal when it is clicked


// var butGet = document.getItem("parkInfo");
// var butLink = document.getElementById("findParkButt");
//     butLink.innerHTML = butGet[i].name;
//     butLink.appendChild();

function displayRandoParks() {
    var parkAppend = localStorage.getItem("parkInfo"); //If I have to make html elements myself...
    var parkAppendII =document.getElementById("findParkBlock")
    console.log(parkAppendII)

    var weatherAppend = localStorage.getItem("getParkWeather")
    var weatherAppendII = document.getElementById("findParkBlock")
    console.log(weatherAppendII);
       
    // parkAppendII.innerHTML = parkAppend;
    parkAppend = JSON.parse(parkAppend);
    console.log(typeof parkAppend);
    for(let i=0; i<parkAppend.length; i++) {
    
        
    var createPOne = document.createElement('h2')
    console.log(parkAppend[i].name);
    createPOne.innerHTML = parkAppend[i].name;
    parkAppendII.appendChild(createPOne);
        
    var UrlPOne = document.createElement('h2')
    UrlPOne.innerHTML = parkAppend[i].url;
    parkAppendII.appendChild(UrlPOne);
    
    createPOne.classList.add("C-1") }//filler class name until I get real names from html/css

    //Attempting to recreate append of park name & url with a weather aspect
    weatherAppend = JSON.parse(weatherAppend);
    console.log(typeof weatherAppend);

    var createWOne = document.createElement('h2');
    console.log(weatherAppend);
    createWOne.innerHTML = weatherAppend;
    weatherAppend.appendChild(createWOne);
    //MUST FIX RETURNS NULL AT THIS TIME
    
}

displayRandoParks();



//modal javascript

var modalBtn = $('.modalBtn');
var modalBg = $('.modal-bg');
var modalClose = $('.modal-close');

modalBtn.addEventListener('click', function(){
    modalBg.classList.add('bg-active');
})
modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active');
})

//include drop down with activity options: fishing, hiking, hunting, climbing, etc.




//connect user choice to api for park suggestion



//ensure park suggestion appears on page 

//create an if statement 