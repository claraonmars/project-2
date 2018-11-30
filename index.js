const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Set up middleware
app.use(express.static('public'));
app.use(express.json());

app.use(methodOverride('_method'));
app.use(cookieParser());
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

//sending
  socket.on('sending', function(data){
        console.log(data);

      //receiving
        io.emit('recieve', data);

      //if disconnect
        if(data=="exit"){
            socket.disconnect( console.log('sender disconnected'));
        }
  });


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