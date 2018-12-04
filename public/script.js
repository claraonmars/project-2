

window.onload = function() {

    // socket setup
    var socket = io();
    var userid

    //var socket = io('http://localhost:3000')

    // socket auth
    $("#login_soc").click(function(){
      socket.emit("login_register", {
          user: $("#username").val(),
          pass: $("#password").val()
          });
      });
    socket.on("logged_in", function(name){
      userid = name.user_id;
    });


    //Show chat box on click
    $(".chat").click(function(){
        document.querySelector('.chatbody').innerText = '';

        var hasFocus = $('.chat').is(':focus');

            if(hasFocus){

                document.querySelector('.chatbox').style.display="block";

                var otherUserId = this.name;

                //send socket info on who i am talking to
                socket.emit('thisuser', {id: otherUserId});


                //receive socket chat history
                socket.once('chat_history', function(mymsg){

                    for (var i = 0; i < mymsg.rows.length; i++){

                        //messages from me
                        if (mymsg.rows[i].otheruser_id === parseInt(otherUserId)){
                        var newdiv = document.createElement("p");
                        newdiv.classList.add("text_right");
                        newdiv.innerText =  mymsg.rows[i].chat
                        document.querySelector('.chatbody').appendChild(newdiv);
                                        updateScroll();

                        }
                        //messages from other user
                        else{
                        var newdiv = document.createElement("p");
                        newdiv.classList.add("text_left");
                        newdiv.innerText =  mymsg.rows[i].chat
                        document.querySelector('.chatbody').appendChild(newdiv);
                                        updateScroll();

                        }
                    }

                });
            }

            //Send message on click
                $('#submitchatform').click(function(){
                    var chat_input = document.querySelector('#chatform').value;
                    socket.emit('chat', {userid: readCookie('userId'), otheruser: otherUserId, message:chat_input});
                    document.querySelector('#chatform').value = '';
                    return false;
                });
                socket.on('recieve', function(msg){
                        var newdiv = document.createElement("p");
                        newdiv.classList.add("text_right");
                        newdiv.innerText =  msg.message;
                        document.querySelector('.chatbody').appendChild(newdiv);
                        updateScroll();
                    });
      return false;
      });




    let currentuser = readCookie('userId');
    let loginStatus = readCookie('status');


    //if div exists on page, execute event listener
    if (document.querySelector('#selected')) {
        document.querySelector('#selected').addEventListener('click', addReaction);
    }

    if (document.querySelector(`#user_${currentuser}`)) {
        document.querySelector(`#user_${currentuser}`).
        addEventListener('click', openChatWindow);
    }

    // if (document.querySelector('#submitchatform')) {
    //     document.querySelector('#submitchatform').
    //     addEventListener('click', startChat);
    // }

    if (document.querySelector('#loginLat')) {
        getLocation();
    }


    //check which requests user has reacted to
    if (loginStatus === 'loggedIn') {
        checkReactions();

        //check if others have reacted to my requests
        checkNotifications();

        //checkChat();
    }

    if (window.location.href.match('http://localhost:3000') != null) {

        accessDatabase();
    }

};

function updateScroll(){
    var element = document.querySelector(".chatbody");
    element.scrollTop = element.scrollHeight;
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    document.querySelector('#loginLat').value = position.coords.latitude;
    document.querySelector('#loginLong').value = position.coords.longitude;

}


function addReaction() {
    event.preventDefault();

    let postid = document.getElementById("postid").value;

    var ajaxUrl = "/user/accept/" + postid;

    // what to do when we recieve the request
    var responseHandler = function() {

        //console.log("response text", this.responseText);
        //console.log("status text", this.statusText);
        //console.log("status code", this.status);

        // react to a request (accepting a task)
        var responseObj = JSON.parse(this.responseText);

        // if item has been selected by currentuser

        if (document.getElementById(postid.toString()).value === "Selected") {
            removeReaction();

            document.getElementById(postid).value = "Become Task Buddy";
            document.getElementById(postid).classList.add('outline_button');

            //document.select_task.action = '/user';

        } else {
            document.getElementById(postid).value = "Select";
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

function removeReaction() {

    let postid = document.getElementById("postid").value;

    var ajaxUrl = "/user/remove/" + postid + '?_method=DELETE';

    var responseHandler = function() {
        //console.log("response text", this.responseText);
        //console.log("status text", this.statusText);
        //console.log("status code", this.status);
    };

    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("POST", ajaxUrl);

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
    var ajaxUrl = "/user/checkreaction";

    // what to do when we recieve the request
    var responseHandler = function() {
        //console.log("response text", this.responseText);
        //console.log("status text", this.statusText);
        //console.log("status code", this.status);

        var responseObj = JSON.parse(this.responseText);

        // if item has been selected by currentuser
        if (responseObj.rowCount >= 1) {
            for (var i =0; i < responseObj.rows.length; i++){
                document.getElementById(responseObj.rows[i].post_id.toString()).value = 'Selected';
                document.getElementById(responseObj.rows[i].post_id.toString()).classList.remove('outline_button');
            }
            // let here = readCookie('userId');


            // for (var i = 0; i < responseObj.rows.length; i++) {
            //     if (responseObj.rows[i].user_id === parseInt(here)){


            //     }
            // }
        }
    };
    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("GET", ajaxUrl);

    request.send();
};

function checkNotifications() {
    var ajaxUrl = '/user/checknotification';

    var responseHandler = function() {
        //console.log("response text", this.responseText);
        //console.log("status text", this.statusText);
        //console.log("status code", this.status);

        var responseObj = JSON.parse(this.responseText);

        // if other user has reacted to my request
        for (var i = 0; i < responseObj.rows.length; i++) {
            if (responseObj.rowCount >= 1 && responseObj.rows[i].readby === false) {
                document.querySelector('.notification').setAttribute("style", "display: block;")

                var link = document.createElement('a');
                link.href = '/user/notification';
                link.innerText = responseObj.rowCount;
                document.querySelector('.notification').appendChild(link);
            }
        }
    };
    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);

    request.open("GET", ajaxUrl);

    request.send();
}


function accessDatabase() {
    let currentuserLat = readCookie('latitude');
    let currentuserLong = readCookie('longitude');

    var ajaxUrlOne = '/post/sort/db';
    var responseHandlerOne = function() {

        var responseObjOne = JSON.parse(this.responseText);

        for (var i = 0; i < responseObjOne.rows.length; i++) {
            var ajaxUrlTwo = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + (currentuserLong) + ',' + (currentuserLat) + ';' + (responseObjOne.rows[i].loclong) + ',' + (responseObjOne.rows[i].loclat) + '?access_token=pk.eyJ1IjoiY2xhcmFvbm1hcnMiLCJhIjoiY2puOHgxdnhlMGk5bTN0bnc2b2JiaXhuZSJ9.Bbd0prUBoCltNk8UOyFD0Q'

            console.log(ajaxUrlTwo);
            let numOne = responseObjOne.rows[i].post_id;

            var responseHandlerTwo = function() {

                var responseObjTwo = JSON.parse(this.responseText);
                //console.log('isthisworking:',responseObjTwo)
                let numTwo = responseObjTwo.routes[0].duration;

                var ajaxUrlThree = '/post/sort/loc?id=' + numOne + '&duration=' + numTwo;

                var responseHandlerThree = function() {
                    var responseObjThree = JSON.parse(this.responseText);
                    //console.log('whatabouthtis:',responseObjThree)


                };
                var requestThree = new XMLHttpRequest();
                requestThree.addEventListener("load", responseHandlerThree);
                requestThree.open("GET", ajaxUrlThree);
                requestThree.send();



            }
            var requestTwo = new XMLHttpRequest();
            requestTwo.addEventListener("load", responseHandlerTwo);
            requestTwo.open("GET", ajaxUrlTwo);
            requestTwo.send();
        }

    };
    var requestOne = new XMLHttpRequest();
    requestOne.addEventListener("load", responseHandlerOne);
    requestOne.open("GET", ajaxUrlOne);
    requestOne.send();
}


function saveLocation() {
    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var lat = place.geometry.location.lat();
        var long = place.geometry.location.lng()


        document.getElementById('city2').value = place.name;
        document.getElementById('cityLat').value = lat;
        document.getElementById('cityLng').value = long;
        //alert("This function is working!");
        //alert(place.name);
        // alert(place.address_components[0].long_name);

    });
}




google.maps.event.addDomListener(window, 'load', saveLocation);