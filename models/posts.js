module.exports = (dbPoolInstance) => {
    const allPosts = (callback)=>{
        let queryString = 'SELECT * FROM posts'
        dbPoolInstance.query(queryString, (error, queryResult)=>{
            callback(error, queryResult);
        })
    }
    return{
        allPosts
    };
}