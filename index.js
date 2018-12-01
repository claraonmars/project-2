const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');
const socket = require('socket.io')
const cookieParserIo = require('socket.io-cookie-parser');



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const http = require('http').Server(app);
//const io = require('socket.io')(http);
const io = socket(http);

// Set up middleware
app.use(express.static('public'));
app.use(express.json());

app.use(methodOverride('_method'));
app.use(cookieParser());
io.use(cookieParserIo());

app.use(express.urlencoded({
  extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);



/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests
require('./routes')(app, db);

//on socket connection
io.on('connection', function(socket){
  console.log('a user connected');
  var req =socket.request;
  let cookies = socket.request.cookies;
console.log(cookies);

//sending
socket.on('login_register', function(data){
    const user=data.user;

    let queryString = 'SELECT * FROM users WHERE username =' + "'" + user + "';";

    db.pool.query(queryString, (error, queryResult) => {
        if(error){
            console.log('error')
        }
        else{
            userid=queryResult.rows[0].id;
            io.emit('logged_in', {user_id: queryResult.rows[0].id});
        }
    });
})

// get chat history
socket.on('thisuser', function(data){

    let queryString = 'SELECT * FROM chat WHERE currentuser_id ='  + cookies.userId + 'AND otheruser_id =' + data.id;

    db.pool.query(queryString, (error, queryResult) => {
        if(error){
            console.log('error')
        }
        else{
            io.emit('chat_history', queryResult);
        }
    });

})

// testing socket
// socket.on('chat', function(data){
//     if(data.id === cookies.userId){
//      io.emit('recieve', data);
//     }
//})

  // socket.on('sending', function(data){
  //       console.log(data);

  //     //receiving
  //       io.emit('recieve', data);

  //     //if disconnect
  //       if(data=="exit"){
  //           socket.disconnect( console.log('sender disconnected'));
  //       }
  // });


});

// Root GET request (it doesn't belong in any controller file)
// app.get('/', (request, response) => {
//   response.send('Welcome To TaskBuddy.');
// });
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = http.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});