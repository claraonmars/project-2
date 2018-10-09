var sha256 = require('js-sha256');

module.exports = (dbPoolInstance) => {

    const loggedIn = (requestBody, callback) => {
        let queryString = 'SELECT * FROM users WHERE name =' + "'" + requestBody.name + "';";

        dbPoolInstance.query(queryString, (error, queryResult) => {
            console.log(queryString);

            callback(error, queryResult);
            console.log('this:', queryResult)
        });
    }

    const create = (username, callback) => {
        let queryString = 'SELECT * FROM users WHERE name =' + "'" + username.name + "';";
        dbPoolInstance.query(queryString, (error, queryResult) => {
            if (error) {
                var hashedValue = sha256(username.password);

                const secondQueryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id';
                const values = [
                    username.name,
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