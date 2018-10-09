var sha256 = require('js-sha256');
const SALT = "tweedr tweeds";

module.exports = (db) => {
    const home = (request, response) => {
        response.render('user/home');
    }

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

                response.cookie('loggedIn', hashedCookie);
                response.cookie('username', queryResult.rows[0].id);
                response.redirect('/');

            } else {
                console.log('User could not be created');
                response.redirect('/register');
            }
        });
    };

    const loggedIn = (request, response) => {
        db.user.loggedIn(request.body, (error, queryResult) => {
            console.log(queryResult);
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            //var hashedValue = sha256(request.body.password);
            if (request.body.name !== undefined && request.body.password === queryResult.rows[0].password) {

                response.cookie('loggedIn', queryResult.rows[0].password);
                response.cookie('username', queryResult.rows[0].id);
                response.redirect('/');
            } else {
                response.send('not logged in')
            }
        });
    }
    return {
        home,
        loginForm,
        registerForm,
        registerCreate,
        loggedIn
    };
}