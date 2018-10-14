module.exports = (db) => {

    const home = (request, response) => {
        let userid =request.cookies['userId']
        db.posts.allPosts(userid, (error, queryResult) => {
            if (request.cookies['status'] === 'loggedIn') {

                let cookies = {
                    status: request.cookies['status'],
                    userId: request.cookies['userId'],
                    userName: request.cookies['userName'],
                    name: request.cookies['name']
                }

                response.render('posts/allPosts', { posts: queryResult.rows, cookies: cookies})
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
        db.posts.postedReq(type, request.body, request.cookies['userId'], (error, queryResult)=>{
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            response.redirect('/');
        });
    };

    const editPost = (request, response) => {
        let postid = request.params.id;
        db.posts.editPost(postid, (error, queryResult)=>{
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
        response.render('posts/editPost',{reqinfo: queryResult.rows, postid:postid});
        });
    };

    const updatePost = (request, response) =>{
        let requestbody = request.body;
        let postid = request.params.id;
        db.posts.updatePost(requestbody, postid, (error, queryResult)=>{
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            response.redirect('/user');
        })
    }

    const remove = (request, response) =>{
        let postid = request.params.id;
        db.posts.remove(postid, (error, queryResult)=>{
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            response.redirect('/user');

        })
    }

    const sortLoc = (request, response) =>{
        let postid =request.query.id;
        let duration = request.query.duration;
        db.posts.sortLoc(postid, duration, (error, queryResult) => {
        if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            response.json(queryResult);

        });
    }

    const sortDb = (request, response) =>{
        let userid =request.cookies['userId']
        db.posts.sortDb(userid, (error, queryResult) => {
        if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            response.json(queryResult);

        });
    }


    return {
        home,
        postReqForm,
        postedReq,
        editPost,
        updatePost,
        remove,
        sortDb,
        sortLoc
    };

}