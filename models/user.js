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

    const profile = (cookies, callback)=>{
        let queryString = 'SELECT * FROM posts INNER JOIN users ON (users.id = posts.user_id) WHERE users.id = ' + cookies.userId + 'ORDER BY selectedtime ASC';
        dbPoolInstance.query(queryString, (error, queryResult) =>{
            callback(error, queryResult);
        })
    }

    // const reactTo = (cookies, requestBody, callback) => {
    //     let queryString = 'INSERT INTO schedule (user_id, post_id, accept_time) VALUES ($1,$2,CURRENT_TIMESTAMP)';
    //     let values = [
    //     cookies.userId, requestBody.post_id]
    //     dbPoolInstance.query(queryString, values,(error, queryResult) =>{
    //         callback(error, queryResult);
    //     })
    // }

    const addReaction = (cookies, requestBody, callback) =>{
        // let queryString = 'SELECT * FROM schedule WHERE user_id = ' + cookies.userId;
        // dbPoolInstance.query(queryString, (error, queryResult)=>{
        //     callback(error, queryResult)
        // })


        let queryString = 'INSERT INTO schedule (user_id, post_id, accept_time) VALUES ($1,$2,CURRENT_TIMESTAMP)';
        let values = [
        cookies.userId, requestBody]
        dbPoolInstance.query(queryString, values,(error, queryResult) =>{
            callback(error, queryResult);
        })
    }

    const checkReaction = (userid, callback)=>{
        let queryString = 'SELECT * FROM schedule WHERE user_id=' + userid;
        dbPoolInstance.query(queryString, (error, queryResult) =>{
            callback(error, queryResult);
        })
    }

    return {
        loggedIn,
        create,
        profile,
        //reactTo,
        addReaction,
        checkReaction
    };
}