let http = require('http'),
  fs = require('fs'),
  url = require('url'),
  addr = 'http://localhost:8080/',
  uuid = require('uuid');

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

let movies = [
  {
    title: 'The Conjuring',
    director: {
      name: 'Michael Chaves',
      DateOfBirth: 'October 25, 1989',
      DateOfDeath: 'Alive at age 32.'
    },
    genre: {
      'Horror',
      'Thriller'
    },
    description:'The Conjuring is a 2013 supernatural horror film inspired by the true-life story of the Perron family, who claimed they "lived among the dead" in the 1970s as spirits both friendly and sinister inhabited their Rhode Island farmhouse.'
  },

  {
    title: 'The Addams Family',
    director: {
      name: 'Barry Sonnenfeld',
      DateOfBirth: 'April 1, 1953',
      DateOfDeath: 'Alive at age 68.'
    },
    genre: {
      'Horror',
      'Dark Comedy'
    },
    description:'Addams Family characters include Gomez, Morticia, Uncle Fester, Lurch, Grandmama, Wednesday and Pugsley. The Addamses are a satirical inversion of the ideal American family; an eccentric, wealthy clan who delight in the macabre and are unaware that people find them bizarre or frightening.'
  },

  {
    title: 'Nightmare Before Christmas',
    director:{
      name: 'Henry Selick',
      DateOfBirth: 'November 30, 1952',
      DateOfDeath: 'Alive at age 68.'
    },
    genre:{
      'Musical',
      'Animation'
    },
    description:'It tells the story of Jack Skellington, the King of "Halloween Town" who stumbles upon "Christmas Town" and becomes obsessed with celebrating the holiday. Danny Elfman wrote the songs and score, and provided the singing voice of Jack.'
  },

  {
    title: 'The Heat',
    director:{
      name:'Paul Feig',
      DateOfBirth: 'September 17, 1962',
      DateOfDeath: 'Alive at age 59.'
    },
    genre:{
      'Comedy',
      'Action'
    },
    description:'FBI Special Agent Sarah Ashburn (Sandra Bullock) is a methodical investigator with a long-standing reputation for excellence -- and arrogance. In contrast, foul-mouthed, hot-tempered detective Shannon Mullins (Melissa McCarthy) goes with her gut instincts and street smarts to remove criminals from the streets of Boston. Sparks fly when these polar opposites have to work together to capture a drug lord, but in the process, they become the last thing anyone expected -- buddies.'
  },

  {
    title: 'Jungle Cruise',
    director: {
      name:'Jaume Collet-Serra',
      DateOfBirth: 'March 23, 1974',
      DateOfDeath: 'Alive at age 47.'
    },
    genre:{
      'Comedy',
      'Action'
    },
    description:'Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his ramshackle boat. Together, they search for an ancient tree that holds the power to heal -- a discovery that will change the future of medicine.'
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

//gets ALL movies
app.get('/movies', (req, res) => {
  res.json(movies);
});
// Gets the data about a single student, by name
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movies) =>
    { return movies.title === req.params.title }));
});

// //list ALL directors
// app.get('/director', (req,res)=>{
//   let directors = movies.map(movie => ['director']);
//   res.json(director);
// });
app.get("/directors/:Name", (req,res) => {
  Movies.find({"Director.Name": req.params.Name})
  .then((movies) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
})
// //get director by name
// app.get('/movies/:director', (req, res) => {
//   res.json(movies.find((director) =>
//     { return movies.director === req.params.director }));
// });
// //get director bio
// app.get('/movies/:director/[name]', (req, res) => {
//   res.json(movies.find((director) =>
//     { return movies.director === req.params.director }));
// });
// //list of genre
app.get('/genre', (req, res)=>{
  let genre = movies.map(movies => ['genre']);
  let uniqueGenre = [...new Set(genre)];
  res.json(uniqueGenre);
});
//get genres
app.get('/movies/:genre', (req, res) => {
  res.json(movies.find((genre) =>
    { return movies.uniqueGenre === req.params.uniqueGenre }));
});

app.get('/description', (req,res)=>{
  let descriptions = movies.map (movies => ['description']);
  res.json(description);
});

//error handler
app.use(express.static('public'));

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
//

// app.use(uuid());

app.use((err, req, res, next) => {
  console.log (err.stack);
  res.status(500).send('Something is Wrong!')
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
