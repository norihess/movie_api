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
    imageUrl: 'https://c8.alamy.com/comp/DT9FMB/movie-poster-the-conjuring-2013-DT9FMB.jpg',
    Director: {
      Name: 'Michael Chaves',
      DateOfBirth: 'October 25, 1989',
      DateOfDeath: 'Alive at age 32.'
    },
    Genre:{
      Type:'Horror',
      Description:'The Conjuring is a 2013 supernatural horror film inspired by the true-life story of the Perron family, who claimed they "lived among the dead" in the 1970s as spirits both friendly and sinister inhabited their Rhode Island farmhouse.'
    },
    movieID:'1'
  },

  {
    Title: 'The Addams Family',
    imageUrl: 'https://prodimage.images-bn.com/pimages/0032429329738_p0_v1_s550x406.jpg',
    Director: {
      Name: 'Barry Sonnenfeld',
      DateOfBirth: 'April 1, 1953',
      DateOfDeath: 'Alive at age 68.'
    },
    Genre: {
      Type: 'Dark Comedy',
      Description:'Addams Family characters include Gomez, Morticia, Uncle Fester, Lurch, Grandmama, Wednesday and Pugsley. The Addamses are a satirical inversion of the ideal American family; an eccentric, wealthy clan who delight in the macabre and are unaware that people find them bizarre or frightening.'
    },
    movieID:'2'
  },

  {
    Title: 'Nightmare Before Christmas',
    imageUrl: 'https://www.udiscovermusic.com/wp-content/uploads/2018/09/The-Nightmare-Before-Christmas-album-cover-web-optimised-820.jpg',
    Director:{
      Name: 'Henry Selick',
      DateOfBirth: 'November 30, 1952',
      DateOfDeath: 'Alive at age 68.'
    },
    Genre: {
      Type: 'Animation',
      Description:'It tells the story of Jack Skellington, the King of "Halloween Town" who stumbles upon "Christmas Town" and becomes obsessed with celebrating the holiday. Danny Elfman wrote the songs and score, and provided the singing voice of Jack.'
    },
    movieID:'3'
  },

  {
    Title: 'The Heat',
    imageUrl: 'https://www.newdvdreleasedates.com/images/posters/large/the-heat-2013-03.jpg',
    Director:{
      Name:'Paul Feig',
      DateOfBirth: 'September 17, 1962',
      DateOfDeath: 'Alive at age 59.'
    },
    Genre: {
      Type: 'Action',
      Description:'FBI Special Agent Sarah Ashburn (Sandra Bullock) is a methodical investigator with a long-standing reputation for excellence -- and arrogance. In contrast, foul-mouthed, hot-tempered detective Shannon Mullins (Melissa McCarthy) goes with her gut instincts and street smarts to remove criminals from the streets of Boston. Sparks fly when these polar opposites have to work together to capture a drug lord, but in the process, they become the last thing anyone expected -- buddies.'
    },
    movieID:'4'
  },

  {
    Title: 'Jungle Cruise',
    imageUrl: 'https://m.media-amazon.com/images/I/91cOSkwoAFL._AC_SY679_.jpg',
    Director: {
      Name:'Jaume Collet-Serra',
      DateOfBirth: 'March 23, 1974',
      DateOfDeath: 'Alive at age 47.'
    },
    Genre: {
      Type: 'Action',
      Description:'Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his ramshackle boat. Together, they search for an ancient tree that holds the power to heal -- a discovery that will change the future of medicine.'
    },
    movieID:'5'
  }
];
//directors
let directors = [
  {
    directorID: '1',
    Name: 'Michael Chaves',
    DateOfBirth: 'October 25, 1989',
    DateOfDeath: 'Alive at age 32.'
  },
  {
    directorID: '2',
    Name: 'Barry Sonnenfeld',
    DateOfBirth: 'April 1, 1953',
    DateOfDeath: 'Alive at age 68.'
  },
  {
    directorID: '3',
    Name: 'Henry Selick',
    DateOfBirth: 'November 30, 1952',
    DateOfDeath: 'Alive at age 68.'
  },
  {
    directorID: '4',
    Name:'Paul Feig',
    DateOfBirth: 'September 17, 1962',
    DateOfDeath: 'Alive at age 59.'
  },
  {
    directorID: '5',
    Name:'Jaume Collet-Serra',
    DateOfBirth: 'March 23, 1974',
    DateOfDeath: 'Alive at age 47.'
  }
];
//genre and description
let genres = [
  //conjuring
  {
    genreID: '1',
    Type:'Horror, Thriller',
    Description:'The Conjuring is a 2013 supernatural horror film inspired by the true-life story of the Perron family, who claimed they "lived among the dead" in the 1970s as spirits both friendly and sinister inhabited their Rhode Island farmhouse.'
  },
  //Addams Fam
  {
    genreID: '2',
    Type: 'Horror, Dark Comedy',
    Description:'Addams Family characters include Gomez, Morticia, Uncle Fester, Lurch, Grandmama, Wednesday and Pugsley. The Addamses are a satirical inversion of the ideal American family; an eccentric, wealthy clan who delight in the macabre and are unaware that people find them bizarre or frightening.'
  },
  //Nightmare
  {
    genreID: '3',
    Type: 'Musical, Animation',
    Description:'It tells the story of Jack Skellington, the King of "Halloween Town" who stumbles upon "Christmas Town" and becomes obsessed with celebrating the holiday. Danny Elfman wrote the songs and score, and provided the singing voice of Jack.'
  },
  //the Heat
  {
    genreID: '4',
    Type: 'Comedy, Action',
    Description:'FBI Special Agent Sarah Ashburn (Sandra Bullock) is a methodical investigator with a long-standing reputation for excellence -- and arrogance. In contrast, foul-mouthed, hot-tempered detective Shannon Mullins (Melissa McCarthy) goes with her gut instincts and street smarts to remove criminals from the streets of Boston. Sparks fly when these polar opposites have to work together to capture a drug lord, but in the process, they become the last thing anyone expected -- buddies.'
  },
  //Jungle
  {
    genreID: '5',
    Type: 'Comedy, Action',
    Description:'Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his ramshackle boat. Together, they search for an ancient tree that holds the power to heal -- a discovery that will change the future of medicine.'
  }
];
let Users =[
  {
    UserID: '1',
    username: 'Brad Gig',
    password: 'userPassWord1',
    email: 'bradg@gmail.com',
    birthday: 'October 4, 1987',
    favoriteMovies: 'The Heat, Addams Family'
  },
  {
    UserID: '2',
    username: 'Jen Hemming',
    password: 'userPassWord2',
    email: 'jenhemming@gmail.com',
    birthday: 'June 25, 1997',
    favoriteMovies: 'Nightmare Before Christmas, Jungle Cruise'
  },
  {
    UserID: '3',
    username: 'Ashley Smith',
    password: 'userPassWord3',
    email: 'ashleys@gmail.com',
    birthday: 'March 12, 1990',
    favoriteMovies: 'The Conjuring, Addams Family'
  },
  {
    UserID: '4',
    username: 'James Morton',
    password: 'userPassWord4',
    email: 'jamesMort@gmail.com',
    birthday: 'December 20, 1993',
    favoriteMovies: 'Jungle Cruise, The Conjuring'
  }
]
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
app.get('/movies/:Title', (req, res) =>{
  res.send ('Successful GET request returning data on single movie' + req.params.title);

});

//GETS ALL directors
app.get('/directors', (req, res) => {
    res.json(directors);
});

// Gets director by name
app.get('/movies/directors/:name', (req, res) => {
res.send('Successful GET request returning data on single director' + req.params.name);
});

// get all genres
app.get('/movies/genres', (req, res) => {
  res.json(genres);
});

//get genre by name
app.get('/movies/genres/:genre', (req, res) => {
res.send('Successful GET request returning data on movie genre' + req.params.genre);
});

//POST
//Allow users to Add Users to register
app.post('/users', (req, res) => {
res.send('Successful POST request registering new user');
});

//Allow users to add a movie to their list of favorites
app.post('/users/:username/favourites/:title', (req, res) => {
res.send('Successful POST request adding movie by title' + req.params.title + 'to list of favourites' + req.params.username); });

//PUT
//Allow users to update their user info (username)
app.put('/users/:username', (req, res) => {
res.send('Successful PUT request updating username' + req.params.username);
});

//DELETE
//Allow users to remove a movie from their list of favorites
app.delete('/users/:username/favourites/:title', (req, res) => {
res.send('Successful DELETE request removing movie by title' + req.params.title + 'from list of favourites' + req.params.username); });

//Allow existing users to deregister
app.delete('/users/:username', (req, res) => {
res.send('Successful DELETE request removing user: ' + req.params.username + ' from database');
});

//error handler
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.log (err.stack);
  res.status(500).send('Something is Wrong!')
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
