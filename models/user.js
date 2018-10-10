var sha256 = require('js-sha256');

module.exports = (dbPoolInstance) => {

    const loggedIn = (requestBody, callback) => {
        let queryString = 'SELECT * FROM users WHERE username =' + "'" + requestBody.username + "';";

        dbPoolInstance.query(queryString, (error, queryResult) => {

            callback(error, queryResult);
        });
    }

    const create = (username, callback) => {
        let queryString = 'SELECT * FROM users WHERE username =' + "'" + username.username + "' OR email ='" + username.email + "'";
        dbPoolInstance.query(queryString, (error, queryResult) => {
            console.log('quersting:', queryResult);
            if (queryResult.rowCount === 0) {
                var hashedValue = sha256(username.password);

                const secondQueryString = 'INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
                const values = [
                    username.firstname,
                    username.lastname,
                    username.email,
                    username.username,
                    hashedValue
                ];

                dbPoolInstance.query(secondQueryString, values, (error, secondQueryResult) => {

                callback(error, secondQueryResult);
                });
            }
            else{
                callback(error, 'usertaken');
            }


        })

    }


    return {
        loggedIn,
        create
    };
}