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

  app.post('/user/accept/:id', user.addReaction);
  app.get('/user/checkreaction', user.checkReaction);
};
