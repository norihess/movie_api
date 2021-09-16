let express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');
  // uuid = require('uuid');


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
app.use(bodyParser.json());
app.use(morgan('common'));

//welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the club!');
});

//list of movies
app.get('/movies', (req,res)=>{
  res.json(movies);
});

//list of director
app.get('/director', (req,res)=>{
  let directors = movies.map(movie => ['director']);
  res.json(director);
});

//list of genre
app.get('/genre', (req, res)=>{
  let genre = movies.map(movie => ['genre']);
  let uniqueGenre = [...new Set(genre)];
  res.json(uniqueGenre);
});

//error handler
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
//
// app.use(bodyParser.json());
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
