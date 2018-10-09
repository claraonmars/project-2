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

  app.post('/login/success', user.loggedIn);
  app.post('/register/success', user.registerCreate);

};
