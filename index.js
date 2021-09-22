let http = require('http'),
  fs = require('fs'),
  url = require('url'),
  addr = 'http://localhost:8080/',
  uuid = require('uuid');

//require()
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
//downloaded packages
app.use(morgan('common'));
app.use(myLogger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

//movies
let movies = [
  {
    Title: 'The Conjuring',
    Director: {
      Name: 'Michael Chaves',
      DateOfBirth: 'October 25, 1989',
      DateOfDeath: 'Alive at age 32.'
    },
    Genre:{
      Type:'Horror, Thriller',
      Description:'The Conjuring is a 2013 supernatural horror film inspired by the true-life story of the Perron family, who claimed they "lived among the dead" in the 1970s as spirits both friendly and sinister inhabited their Rhode Island farmhouse.'
    }
  },

  {
    Title: 'The Addams Family',
    Director: {
      Name: 'Barry Sonnenfeld',
      DateOfBirth: 'April 1, 1953',
      DateOfDeath: 'Alive at age 68.'
    },
    Genre: {
      Type: 'Horror, Dark Comedy',
      Description:'Addams Family characters include Gomez, Morticia, Uncle Fester, Lurch, Grandmama, Wednesday and Pugsley. The Addamses are a satirical inversion of the ideal American family; an eccentric, wealthy clan who delight in the macabre and are unaware that people find them bizarre or frightening.'
      }
  },

  {
    Title: 'Nightmare Before Christmas',
    Director:{
      Name: 'Henry Selick',
      DateOfBirth: 'November 30, 1952',
      DateOfDeath: 'Alive at age 68.'
    },
    Genre: {
      Type: 'Musical, Animation',
      Description:'It tells the story of Jack Skellington, the King of "Halloween Town" who stumbles upon "Christmas Town" and becomes obsessed with celebrating the holiday. Danny Elfman wrote the songs and score, and provided the singing voice of Jack.'
    }
  },

  {
    Title: 'The Heat',
    Director:{
      Name:'Paul Feig',
      DateOfBirth: 'September 17, 1962',
      DateOfDeath: 'Alive at age 59.'
    },
    Genre: {
      Type: 'Comedy, Action',
      Description:'FBI Special Agent Sarah Ashburn (Sandra Bullock) is a methodical investigator with a long-standing reputation for excellence -- and arrogance. In contrast, foul-mouthed, hot-tempered detective Shannon Mullins (Melissa McCarthy) goes with her gut instincts and street smarts to remove criminals from the streets of Boston. Sparks fly when these polar opposites have to work together to capture a drug lord, but in the process, they become the last thing anyone expected -- buddies.'
    }
  },

  {
    Title: 'Jungle Cruise',
    Director: {
      Name:'Jaume Collet-Serra',
      DateOfBirth: 'March 23, 1974',
      DateOfDeath: 'Alive at age 47.'
    },
    Genre: {
      Type: 'Comedy, Action',
      Description:'Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his ramshackle boat. Together, they search for an ancient tree that holds the power to heal -- a discovery that will change the future of medicine.'
    }
  }
];

//functions
// function movies(title, director, genre, description){
//   movie.title = title;
//   movie.director= director;
//   movie.genre = genre;
//   movie. description = description;
// }

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to the club!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

//GETS ALL movies
app.get('/movies', (req, res) => {
  res.json(movies);
});
//GETS movie by title
app.get('/movie/titles' (req, res) =>{
  movies.findOne({title: req.params.title})
  .then((movie) =>{
    res.json(movie);
    return movies.title === req.params.title
  }).catch ((err) => {
    console.error(err);
    res.status(500).send('There is no movies of this title');
  });
});

//GETS ALL directors
// app.get('/directors', (req,res)=>{
//   let directors = moveis.map(movies => ['director']);
//   // let directors = movies.map(movies => ['directors']);
//   res.json(director);
// });
app.get("/directors", (req, res) => {
  Directors.find().populate('Movie')
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
// Gets the director name
app.get("/directors/:Name", (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GETS ALL genres and descriptions
// app.get('/genre', (req, res)=>{
//   let genre = movies.map(movies => ['genre']);
//   // let uniqueGenre = [...new Set(genre)];
//   res.json(genre);
// });
get all genres
app.get('/genres', (req, res) => {
  Genres.find()
  .then((genre) => {
    res.status(201).json(genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
})

//get genre by name
app.get("/genres/:Name", (req, res) => {
  Genres.findOne({ Name: req.params.Name })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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
