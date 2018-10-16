var sha256 = require('js-sha256');
const SALT = "tweedr tweeds";

module.exports = (db) => {
    const loginForm = (request, response) => {
        response.render('user/loginForm');
    }

    const registerForm = (request, response) => {
        response.render('user/registerForm');
    }

    const registerCreate = (request, response) => {
        db.user.create(request.body, (error, queryResult) => {
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            if (queryResult.rowCount >= 1) {
                console.log('User created successfully');

                let createdId = queryResult.rows[0].id;
                var hashedCookie = sha256(SALT + createdId);

                response.cookie('check', hashedCookie);
                response.cookie('status', 'loggedIn');
                response.cookie('userId', queryResult.rows[0].id);
                response.cookie('userName', queryResult.rows[0].username);
                response.cookie('name', queryResult.rows[0].firstname);
                response.cookie('latitude', request.body.lat);
                response.cookie('longitude', request.body.long);

                response.redirect('/');

            } else {
                console.log('User could not be created');
                response.redirect('/register');
            }
        });
    };

    const loggedIn = (request, response) => {
        db.user.loggedIn(request.body, (error, queryResult) => {
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            var hashedCookie = sha256(request.body.password);
            if ((request.body.username !== undefined )&& hashedCookie === queryResult.rows[0].password) {

                response.cookie('check', hashedCookie);
                response.cookie('status', 'loggedIn');
                response.cookie('userId', queryResult.rows[0].id);
                response.cookie('userName', queryResult.rows[0].username);
                response.cookie('name', queryResult.rows[0].firstname);
                response.cookie('latitude', request.body.lat);
                response.cookie('longitude', request.body.long);

                response.redirect('/');
            } else {
                response.redirect('/')
            }
        });
    }

    const logout = (request, response) => {
        response.clearCookie('check');
        response.clearCookie('status');
        response.clearCookie('userId');
        response.clearCookie('userName');
        response.clearCookie('name');
        response.clearCookie('latitude');
        response.clearCookie('longitude');
        response.redirect('/login');

    }

    const profile = (request, response) =>{
        let cookies = {
                    status: request.cookies['status'],
                    userId: request.cookies['userId'],
                    userName: request.cookies['userName'],
                    name: request.cookies['name']
                }
        if (cookies.status === 'loggedIn'){
        db.user.profile(cookies, (error, queryResult, secondQueryResult)=>{
            console.log(secondQueryResult)
        response.render('user/profile', {cookies:cookies, requests: queryResult.rows, accepted: secondQueryResult.rows})
    });}
        else{
            response.redirect('/');
        }
    }

    const addReaction = (request, response) => {
        console.log('this:',request.params.id)
        let cookies = {
                    status: request.cookies['status'],
                    userId: request.cookies['userId'],
                    userName: request.cookies['userName'],
                    name: request.cookies['name']
                }

        db.user.addReaction(cookies, request.params.id, (error, queryResult)=>{
            if (error) {
                console.error('error checking this user:', error);
                response.sendStatus(500);
            }
            response.json(queryResult);
        })
    }

    const checkReaction = (request, response)=>{

        db.user.checkReaction(request.cookies['userId'],(error,queryResult)=>{
            if (error) {
                console.error('error checking this user:', error);
                response.sendStatus(500);
            }
            response.json(queryResult);
        })
    }

    const checkNotification = (request, response) =>{
        db.user.checkNotification(request.cookies['userId'],(error,queryResult)=>{
            if (error) {
                console.error('error checking this user:', error);
                response.sendStatus(500);
            }
            response.json(queryResult);
        })
    }

    const viewNotification = (request, response) =>{
        let userid= request.cookies['userId'];
        let cookies = {
                    status: request.cookies['status'],
                    userId: request.cookies['userId'],
                    userName: request.cookies['userName'],
                    name: request.cookies['name']
                }
        db.user.viewNotification(userid, (error, queryResult)=>{
           if (error) {
                console.error('error getting notification:', error);
                response.sendStatus(500);
            }

            //response.send(queryResult);
            response.render('user/notifications', {cookies: cookies, notify: queryResult.rows});
        })
    }

    const removeReaction = (request, response) =>{
        db.user.removeReaction(request.params.id, request.cookies['userId'],(error,queryResult)=>{
            if (error) {
                console.error('error removing this user reaction:', error);
                response.sendStatus(500);
            }
            response.json(queryResult);
        })
    }

    const removeAccept = (request, response) =>{
        db.user.removeAccept(request.params.id, (error, callback)=>{
            if (error) {
                console.error('error removing this user reaction:', error);
                response.sendStatus(500);
            }
            response.redirect('user/notifications');
        })
    }

    const openChat = (request, response)=>{
        let currentUser = request.cookies['userId'];
        let otherUser = request.params.id;
        db.user.openChat(currentUser, otherUser, (error, queryResult)=>{
           if (error) {
                console.error('error opening chat:', error);
                response.sendStatus(500);
            }
            response.json(queryResult);
        })
    }

    const startChat= (request, response) =>{
        let currentUser = request.cookies['userId'];
        db.user.startChat(currentUser, request.query, (error, queryResult)=>{
           if (error) {
                console.error('error opening chat:', error);
                response.sendStatus(500);
            }
            response.json(queryResult);
        })
    }

    return {
        loginForm,
        registerForm,
        registerCreate,
        loggedIn,
        logout,
        profile,
        addReaction,
        checkReaction,
        checkNotification,
        viewNotification,
        removeReaction,
        removeAccept,
        openChat,
        startChat
    };
}