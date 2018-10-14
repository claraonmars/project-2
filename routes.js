module.exports = (app, db) => {

  const user = require('./controllers/user')(db);
  const posts = require('./controllers/posts')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/', posts.home);

  app.get('/user', user.profile);
  //app.post('/user/react/:id', user.reactTo);

  app.get('/login', user.loginForm);
  app.get('/register', user.registerForm);

  app.delete('/logout', user.logout);

  app.post('/login/success', user.loggedIn);
  app.post('/register/success', user.registerCreate);

  app.put('/post/:id', posts.updatePost);
  app.get('/post/:id', posts.postReqForm);
  app.post('/post/:id', posts.postedReq);

  app.get('/post/:id/edit', posts.editPost);
  app.delete('/post/:id', posts.remove);
  app.get('/user/notification', user.viewNotification);

  //ajax calls
  app.delete('/user/remove/:id', user.removeReaction)
  app.post('/user/accept/:id', user.addReaction);
  app.get('/user/checkreaction', user.checkReaction);
  app.get('/user/checknotification', user.checkNotification);
  app.get('/user/chat', user.startChat);// update chat table
  app.get('/user/chat/:id', user.openChat); // create temp chat table

  app.get('/post/sort/db', posts.sortDb);
  app.get('/post/sort/loc', posts.sortLoc);
  //app.post('/post/calculatedist', post.calDist); // update time distance in table.
  //app.get('/post/sort', post.sortLoc); // sort distance timing
};
