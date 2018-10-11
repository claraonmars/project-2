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
            if (request.body.username !== undefined && hashedCookie === queryResult.rows[0].password) {

                response.cookie('check', hashedCookie);
                response.cookie('status', 'loggedIn');
                response.cookie('userId', queryResult.rows[0].id);
                response.cookie('userName', queryResult.rows[0].username);
                response.cookie('name', queryResult.rows[0].firstname);
                response.redirect('/');
            } else {
                response.send('not logged in')
            }
        });
    }

    const logout = (request, response) => {
        response.clearCookie('check');
        response.clearCookie('status');
        response.clearCookie('userId');
        response.clearCookie('userName');
        response.clearCookie('name');
        response.redirect('/login');

    }

    const profile = (request, response) =>{
        let cookies = {
                    status: request.cookies['status'],
                    userId: request.cookies['userId'],
                    userName: request.cookies['userName'],
                    name: request.cookies['name']
                }
        db.user.profile(cookies, (error, queryResult)=>{
        response.render('user/profile', {cookies:cookies, requests: queryResult.rows})
    });
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

    return {
        loginForm,
        registerForm,
        registerCreate,
        loggedIn,
        logout,
        profile,
        addReaction,
        checkReaction,
        checkNotification
    };
}