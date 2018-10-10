module.exports = (db) => {

    const home = (request, response) => {
        db.posts.allPosts((error, queryResult) => {
            if (request.cookies['status'] === 'loggedIn') {
                console.log(queryResult);

                let cookies = {
                    status: request.cookies['status'],
                    userId: request.cookies['userId'],
                    userName: request.cookies['userName'],
                    name: request.cookies['name']
                }

                response.render('posts/allPosts', { posts: queryResult.rows, cookies: cookies })
            } else {
                response.redirect('/login');
            }
        });
    }

    const postReqForm = (request, response) => {
        let type = request.params.id;
        let cookies = {
                    status: request.cookies['status'],
                    userId: request.cookies['userId'],
                    userName: request.cookies['userName'],
                    name: request.cookies['name']
                }
        response.render('posts/postForm', {type:type,cookies:cookies});
    }

    const postedReq =(request,response) =>{
        let type = request.params.id
        db.posts.postedReq(type,request.body, request.cookies['userId'], (error, queryResult)=>{
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            response.redirect('/');
        })

    }

    return {
        home,
        postReqForm,
        postedReq
    };

}