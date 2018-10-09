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

                console.log(queryResult.rows[0]);

                response.cookie('loggedIn', hashedCookie);
                response.cookie('access', 'true');
                response.cookie('userId', queryResult.rows[0].id);
                response.cookie('userName', queryResult.rows[0].name);
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
            var hashedValue = sha256(request.body.password);
            if (request.body.name !== undefined && hashedValue === queryResult.rows[0].password) {

                console.log(queryResult.rows[0]);

                response.cookie('loggedIn', hashedValue);
                response.cookie('access', 'true');
                response.cookie('userId', queryResult.rows[0].id);
                response.cookie('userName', queryResult.rows[0].name);
                response.redirect('/');
            } else {
                response.send('not logged in')
            }
        });
    }
    return {
        loginForm,
        registerForm,
        registerCreate,
        loggedIn
    };
}