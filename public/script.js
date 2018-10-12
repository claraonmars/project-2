window.onload = function() {

    //if div exists on page, execute event listener
    if (document.querySelector('#selected')) {
        document.querySelector('#selected').addEventListener('click', addReaction);
    }

    //check which requests user has reacted to
    checkReactions();

    //check if others have reacted to my requests
    checkNotifications();

    //getLocation();

};

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// var x = document.querySelector("body");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}


//SELECT * FROM Places WHERE (Lat - :Lat)^2 + (Long - :Long)^2 <= :Distance^2
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function addReaction() {
    event.preventDefault();

    let postid = document.getElementById("postid").value;

    var ajaxUrl = "http://127.0.0.1:3000/user/accept/" + postid;

    // what to do when we recieve the request
    var responseHandler = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);

        // react to a request (accepting a task)
        if (document.getElementById("selected").value === "selected") {
            document.getElementById("selected").value = "deselect";
            removeReaction();

            //document.select_task.action = '/user';

        } else {
            document.getElementById("selected").value = "selected";
        }

    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("POST", ajaxUrl);

    // send the request
    request.send();

};

function removeReaction(){
    event.preventDefault();

    let postid = document.getElementById("postid").value;

    var ajaxUrl = "http://127.0.0.1:3000/user/remove/" + postid  + '?_method=DELETE';

    // what to do when we recieve the request
    var responseHandler = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("POST", ajaxUrl);

    // send the request
    request.send();
}

//function to find cookie according to cookie name
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


function checkReactions() {
    var ajaxUrl = "http://127.0.0.1:3000/user/checkreaction";

    // what to do when we recieve the request
    var responseHandler = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);

        var responseObj = JSON.parse(this.responseText);

        // if item has been selected by currentuser
        if (responseObj.rowCount >= 1) {
            let here = readCookie('userId');
            console.log(responseObj.rows[0].user_id);
            for (var i = 0; i < responseObj.rows.length; i++) {
                if (responseObj.rows[i].user_id === parseInt(here)) {
                    document.getElementById("selected").value = "selected";
                }
            }
        }
    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", ajaxUrl);

    // send the request
    request.send();
};

function checkNotifications() {
    var ajaxUrl = 'http://127.0.0.1:3000/user/checknotification';

    var responseHandler = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);

        var responseObj = JSON.parse(this.responseText);

        // if other user has reacted to my request
        for (var i =0; i < responseObj.rows.length; i++){
        if (responseObj.rowCount >= 1 && responseObj.rows[i].readby === false) {

            var link = document.createElement('a');
            link.href = '/user/notification';
            link.innerText = responseObj.rowCount;
            document.querySelector('.notification').appendChild( link );
        }
    }
    };
    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", ajaxUrl);

    // send the request
    request.send();
}