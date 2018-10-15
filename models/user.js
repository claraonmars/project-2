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
            let secondQueryString = 'SELECT * FROM schedule INNER JOIN posts ON (schedule.post_id = posts.post_id) INNER JOIN users ON (users.id = posts.user_id) WHERE schedule.user_id =' + cookies.userId + 'ORDER BY selectedtime ASC';
            dbPoolInstance.query(secondQueryString, (error, secondQueryResult) =>{
            callback(error, queryResult, secondQueryResult);
            })
        })
    }

    const addReaction = (cookies, requestBody, callback) =>{
        let queryString = 'INSERT INTO schedule (user_id, post_id, accept_time) VALUES ($1,$2,CURRENT_TIMESTAMP)';
        let values = [
        cookies.userId, requestBody]
        dbPoolInstance.query(queryString, values,(error, queryResult) =>{
            callback(error, queryResult);
        })
    }

    const removeAccept = (postid, callback)=>{
        let queryString ='DELETE FROM schedule WHERE post_id = '+ postid;
        dbPoolInstance.query(queryString,(error, queryResult) =>{
            callback(error, queryResult);
        })
    }

    const checkReaction = (userid, callback)=>{
        let queryString = 'SELECT * FROM schedule WHERE user_id=' + userid;
        dbPoolInstance.query(queryString, (error, queryResult) =>{
            callback(error, queryResult);
        })
    }

    const checkNotification = (userid, callback)=>{
        let queryString = 'SELECT * FROM posts INNER JOIN schedule ON (posts.post_id = schedule.post_id) WHERE posts.user_id=' + userid;
        dbPoolInstance.query(queryString, (error, queryResult) =>{
            callback(error, queryResult);
        })
    }

    const viewNotification = (userid, callback) =>{
        let queryString =
        `UPDATE schedule
        SET readby = true
        FROM posts
        WHERE (posts.post_id = schedule.post_id) AND (posts.user_id = ${userid});`
        dbPoolInstance.query(queryString, (error, queryResult) =>{
            let secondQueryString=
            'SELECT * FROM posts INNER JOIN schedule ON (posts.post_id = schedule.post_id) INNER JOIN users ON (schedule.user_id = users.id) WHERE posts.user_id =' + userid;
            dbPoolInstance.query(secondQueryString, (error, secondQueryResult) =>{

            callback(error, secondQueryResult);
            })
        })
    }

    const removeReaction = (postid, userid, callback)=>{
        //let queryString = 'DELETE accept_time FROM schedule INNER JOIN posts ON (posts.post_id = schedule.post_id) WHERE schedule.user_id=' + userid + 'AND schedule.post_id =' + postid;
        let queryString = 'DELETE FROM schedule WHERE post_id=' + postid + 'AND user_id=' + userid;
        dbPoolInstance.query(queryString, (error, queryResult) =>{
            callback(error, queryResult);
        })
    }

    const openChat = (currentUser, otherUser, callback) =>{
            let secondQueryString ='SELECT * FROM chat INNER JOIN users ON (chat.poster_id = users.id) WHERE currentuser_id = ' + currentUser + 'AND otheruser_id = ' + otherUser ;
            dbPoolInstance.query(secondQueryString, (error, secondQueryResult) =>{
            callback(error, secondQueryResult);
            })
    }

    const startChat = (currentUser, requestBody, callback) =>{
        let queryString = 'INSERT INTO chat (currentuser_id, otheruser_id, chat, poster_id) VALUES ($1, $2, $3, $4)';
        let values =[currentUser, requestBody.otheruser, requestBody.chatform, currentUser];
        dbPoolInstance.query(queryString, values,(error, queryResult) =>{
        let secondQueryString ='SELECT * FROM chat INNER JOIN users ON (chat.poster_id = users.id)';
            dbPoolInstance.query(secondQueryString, (error, secondQueryResult) =>{
            callback(error, secondQueryResult);
            })
        })
    }

    return {
        loggedIn,
        create,
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