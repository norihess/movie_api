let express = require("express"),
  morgan = require('morgan'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

let topMovies = [
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

app.get('movies', (req, res) => {
  res.json(topMovies);
});


app.get('director', (req, res) => {
  res.json(director);
});

app.get ('genre', (req, res) => {
  res.json(genre);
})

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});


app.use(express.static('/public/documentation.html'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Movie Api is listening on port 8080.')
});
