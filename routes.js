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

  app.get('/login', user.loginForm);
  app.get('/register', user.registerForm);

  app.delete('/logout', user.logout);

  app.post('/login/success', user.loggedIn);
  app.post('/register/success', user.registerCreate);

  app.get('/post/:id', posts.postReqForm)
  app.post('/post/:id/success', posts.postedReq)

};
