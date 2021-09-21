let http = require('http'),
  fs = require('fs'),
  url = require('url'),
  addr = 'http://localhost:8080/';

//   http.createServer((request, response) => {
//   let requestURL = url.parse(request.url, true);
//   if ( requestURL.pathname == '/documentation.html') {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Documentation on the movieclub API.\n');
//   } else {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Welcome to the club!\n');
//   }
//
// }).listen(8080);

// console.log('My first Node test server is running on Port 8080.');
//
// }).listen(8080);
// console.log('My test server is running on Port 8080.');

//movies
let express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  // uuid = require('uuid');
  myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(morgan('common'));
app.use(myLogger);
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

let movies = [
  {
    title: 'The Conjuring',
    director: 'Michael Chaves',
    genre: 'Horror, Thriller'
  },

  {
    title: 'The Addams Family',
    director: 'Barry Sonnenfeld',
    genre: 'Horror, Dark Comedy'
  },

  {
    title: 'Nightmare Before Christmas',
    director: 'Henry Selick',
    genre: 'Musical, Animation'
  },

  {
    title: 'The Heat',
    director: 'Paul Feig',
    genre: 'Comedy, Action'
  },

  {
    title: 'Jungle Cruise',
    director: 'Jaume Collet-Serra',
    genre: 'Comedy, Action'
  },
];

// GET requests
// app.use(bodyParser.json());

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to the club!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

// //list of director
app.get('/director', (req,res)=>{
  let directors = movies.map(movie => ['director']);
  res.json(director);
});
//
// //list of genre
app.get('/genre', (req, res)=>{
  let genre = movies.map(movie => ['genre']);
  let uniqueGenre = [...new Set(genre)];
  res.json(uniqueGenre);
});

//error handler
app.use(express.static('public'));

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
//
app.use(bodyParser.json());
app.use(methodOverride());
// app.use(uuid());

app.use((err, req, res, next) => {
  console.log (err.stack);
  res.status(500).send('Something is Wrong!')
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
