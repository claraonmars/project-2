module.exports = (dbPoolInstance) => {
    const allPosts = (callback)=>{
        let queryString = 'SELECT * FROM posts';
        dbPoolInstance.query(queryString, (error, queryResult)=>{
            callback(error, queryResult);
        });
    };

    const postedReq = (type, requestbody, user_id, callback)=>{
        let queryString = 'INSERT INTO posts (user_id, category, location, selectedTime, details, postedAt) VALUES ($1,$2,$3,$4,$5, CURRENT_TIMESTAMP) RETURNING *';
        let values = [user_id, type, requestbody.location, requestbody.time,requestbody.details];
        dbPoolInstance.query(queryString, values, (error, queryResult)=>{
            callback(error, queryResult);
        });

    };

    const editPost = (postid, callback) => {
        let queryString = 'SELECT * FROM posts WHERE post_id=' + postid;
        dbPoolInstance.query(queryString, (error, queryResult)=>{
            callback(error, queryResult);

        });
    };

    const remove = (postid, callback)=>{
        let queryString = 'DELETE FROM posts WHERE post_id = ' +postid;
        dbPoolInstance.query(queryString, (error, queryResult)=>{
            callback(error, queryResult);

        });
    }


    return{
        allPosts,
        postedReq,
        editPost,
        remove
    };
}