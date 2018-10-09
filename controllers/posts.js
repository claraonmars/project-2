module.exports = (db) => {

    const home = (request, response) => {
        db.posts.allPosts((error, queryResult) => {
            if (request.cookies['access'] === 'true') {
                console.log(queryResult);
                response.render('posts/allPosts', { posts: queryResult.rows })
            }else{
            response.redirect('/login');
        }
        });
    }
    return {
        home
    };

}