window.onload = function() {
    if (document.querySelector('#selected') === true){
    document.querySelector('#selected').addEventListener('click', addReaction);}

    console.log('working');

    //check which requests user has reacted to
    checkReactions();

    //check if others have reacted to my requests
    checkNotifications();

};


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
        document.getElementById("selected").value = "My value";

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

        // if item has been selected
        if (responseObj.rowCount >= 1) {
            let here = readCookie('userId');
            console.log(responseObj.rows[0].user_id);
            for (var i = 0; i < responseObj.rows.length; i++) {
                if (responseObj.rows[i].user_id === parseInt(here)) {
                    document.getElementById("selected").value = "already selected";
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

function checkNotifications(){
    var ajaxUrl = 'http://127.0.0.1:3000/user/checknotification';

    var responseHandler = function() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);

        var responseObj = JSON.parse(this.responseText);

        // if other user has reacted to my request
        if (responseObj.rowCount >= 1) {

            var div = document.createElement('div');
            div.className = 'notification';
            div.innerText = 'someone wants to be your task buddy! \n View \n Chat';
            document.querySelector('article').appendChild( div );
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

