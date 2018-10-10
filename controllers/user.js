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

    return {
        loginForm,
        registerForm,
        registerCreate,
        loggedIn,
        logout
    };
}