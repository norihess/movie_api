let http = require('http'),
  fs = require('fs'),
  url = require('url'),
  addr = 'http://localhost:8080/';
  uuid = require('uuid');

//require()
let express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  uuid = require('uuid');
//   myLogger = (req, res, next) => {
  // console.log(req.url);
//   next();
// };

//mongoose
let mongoose = require('mongoose');
let Models = require('./models.js');

let Movies = Models.Movie;
let Users = Models.User;
let Genre = Models.Genre;
let Director = Models.Director;


//connecting database with connction URI
mongoose.connect('mongodb://localhost:27017/myFlixDB',
{ useNewUrlParser: true, useUnifiedTopology: true });

//downloaded packages
app.use(morgan('common'));
// app.use(myLogger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

//movies
// let movies = [
//   {
//     _id: '1',
//     Title: 'The Conjuring',
//     Description:'The Conjuring is a 2013 supernatural horror film inspired by the true-life story of the Perron family, who claimed they "lived among the dead" in the 1970s as spirits both friendly and sinister inhabited their Rhode Island farmhouse.',
//     Genre: 1,
//     ReleaseYear: '2013',
//     imageUrl: 'https://c8.alamy.com/comp/DT9FMB/movie-poster-the-conjuring-2013-DT9FMB.jpg',
//     Director: 1,
//     Featured: true
//   },
//
//   {
//     _id: '2',
//     Title: 'The Addams Family',
//     Description:'Addams Family characters include Gomez, Morticia, Uncle Fester, Lurch, Grandmama, Wednesday and Pugsley. The Addamses are a satirical inversion of the ideal American family; an eccentric, wealthy clan who delight in the macabre and are unaware that people find them bizarre or frightening.',
//     Genre: 2,
//     ReleaseYear: '1991',
//     imageUrl: 'https://prodimage.images-bn.com/pimages/0032429329738_p0_v1_s550x406.jpg',
//     Director: 2,
//     Featured: false
//   },
//
//   {
//     _id: '3',
//     Title: 'Nightmare Before Christmas',
//     Description:'It tells the story of Jack Skellington, the King of "Halloween Town" who stumbles upon "Christmas Town" and becomes obsessed with celebrating the holiday. Danny Elfman wrote the songs and score, and provided the singing voice of Jack.',
//     Genre: 3,
//     ReleaseYear: '1993',
//     imageUrl: 'https://www.udiscovermusic.com/wp-content/uploads/2018/09/The-Nightmare-Before-Christmas-album-cover-web-optimised-820.jpg',
//     Director: 3,
//     Featured: false
//   },
//
//   {
//     _id: '4',
//     Title: 'The Heat',
//     Description:'FBI Special Agent Sarah Ashburn (Sandra Bullock) is a methodical investigator with a long-standing reputation for excellence -- and arrogance. In contrast, foul-mouthed, hot-tempered detective Shannon Mullins (Melissa McCarthy) goes with her gut instincts and street smarts to remove criminals from the streets of Boston. Sparks fly when these polar opposites have to work together to capture a drug lord, but in the process, they become the last thing anyone expected -- buddies.',
//     Genre: 4,
//     ReleaseYear: '2013',
//     imageUrl: 'https://www.newdvdreleasedates.com/images/posters/large/the-heat-2013-03.jpg',
//     Director: 4,
//     Featured: false
//   },
//
//   {
//     _id: '5',
//     Title: 'Jungle Cruise',
//     Description:'Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his ramshackle boat. Together, they search for an ancient tree that holds the power to heal -- a discovery that will change the future of medicine.',
//     Genre: 5,
//     ReleaseYear: '2021',
//     imageUrl: 'https://m.media-amazon.com/images/I/91cOSkwoAFL._AC_SY679_.jpg',
//     Director: 5,
//     Feautred: false
//   }
// ];
// //directors
// let directors = [
//   {
//     _id: '1',
//     Name: 'Michael Chaves',
//     Bio:'Michael Chaves is an American film director, screenwriter, visual effects artist, editor, and executive producer.',
//     DateOfBirth: 'October 25, 1989',
//     DateOfDeath: 'Alive at age 32.'
//   },
//   {
//     _id: '2',
//     Name: 'Barry Sonnenfeld',
//     Bio: 'Barry Sonnenfeld is an American filmmaker and television director.',
//     DateOfBirth: 'April 1, 1953',
//     DateOfDeath: 'Alive at age 68.'
//   },
//   {
//     _id: '3',
//     Name: 'Henry Selick',
//     Bio: 'Charles Henry Selick is an American stop motion director, producer, and writer.',
//     DateOfBirth: 'November 30, 1952',
//     DateOfDeath: 'Alive at age 68.'
//   },
//   {
//     _id: '4',
//     Name:'Paul Feig',
//     Bio: 'Paul Samuel Feig is an American actor and filmmaker.',
//     DateOfBirth: 'September 17, 1962',
//     DateOfDeath: 'Alive at age 59.'
//   },
//   {
//     _id: '5',
//     Name:'Jaume Collet-Serra',
//     Bio: 'Jaume Collet-Serra is a Spanish-American film director and producer.',
//     DateOfBirth: 'March 23, 1974',
//     DateOfDeath: 'Alive at age 47.'
//   }
// ];
// //genre and description
// let genres = [
//   //conjuring
//   {
//     _id: '1',
//     Name:'Horror',
//     Description:'A horror film is one that seeks to elicit fear or disgust in its audience for entertainment purposes.'
//   },
//   //Addams Fam
//   {
//     _id: '2',
//     Name: 'Dark Comedy',
//     Description:'Dark comedy, also known as black humor, dark humor, morbid humor, edgy humor, or gallows humor, is a style of comedy that makes light of subject matter that is generally considered taboo, particularly subjects that are normally considered serious or painful to discuss. '
//   },
//   //Nightmare
//   {
//     _id: '3',
//     Name: 'Animation',
//     Description:'Animated Films are ones in which individual drawings, paintings, or illustrations are photographed frame by frame (stop-frame cinematography).'
//   },
//   //the Heat
//   {
//     _id: '4',
//     Name: 'Comedy',
//     Description:'A comedy film is a category of film in which the main emphasis is on humor.'
//   },
//   //Jungle
//   {
//     _id: '5',
//     Name: 'Action',
//     Description:'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.'
//   }
// ];
// let Users =[
//   {
//     _id: '1',
//     Username: 'BradGig',
//     Password: 'userPassWord1',
//     Email: 'bradg@gmail.com',
//     Birthday: 'October 4, 1987',
//     FavoriteMovies: [ 4, 3 ]
//   },
//   {
//     _id: '2',
//     Username: 'JenHemming',
//     Password: 'userPassWord2',
//     Email: 'jenhemming@gmail.com',
//     Birthday: 'June 25, 1997',
//     FavoriteMovies: [ 3, 5 ]
//   },
//   {
//     _id: '3',
//     Username: 'AshleySmith',
//     Password: 'userPassWord3',
//     Email: 'ashleys@gmail.com',
//     Birthday: 'March 12, 1990',
//     FavoriteMovies: [ 1, 2 ]
//   },
//   {
//     _id: '4',
//     Username: 'JamesMorton',
//     Password: 'userPassWord4',
//     Email: 'jamesMort@gmail.com',
//     Birthday: 'December 20, 1993',
//     FavoriteMovies: [ 5, 1 ]
//   }
// ]
// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to the club!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

//GETS ALL movies
app.get('/movies', (req, res) => {
   Movies.find()
     .then((movies) => {
       res.status(201).json(movies);
     })
     .catch((err) => {
       console.error(err);
       res.status(500).send('Error: ' + err);
     });
 });

//GETS movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({Title: req.params.Title})
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ', err);
  });
});
//GETS ALL directors
app.get('/director', (req, res)=> {
  Movies.find()
    .then((director) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: '+ err);
    });
});
// Gets director by name
app.get('/director/:Name', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name})
    .then((director) => {
      res.json(director.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

// get all genres
app.get('/genre', (req, res) => {
      Genre.find()
        .then(genre => {
          res.status(201).json(genre);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
        });
    });

//get genre by name
app.get('/genre/:Name', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name})
    .then((genre) => {
      res.json(genre.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

//POST
// GET all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
// GET a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//ADD/POST a user
app.post('/users', (req, res) => {
  //mongoDB command
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        //Mongoose's create command if user doesn't exist
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          //after doc is created, a callback takes place
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          //gives user feedback on transaction
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
//UPDATE user's info
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});
// ADD a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});
// DELETE a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// //PUT
// //Allow users to update their user info (username)
// app.put('/users/:username', (req, res) => {
// res.send('Successful PUT request updating username' + req.params.username);
// });
//
// //DELETE
// //Allow users to remove a movie from their list of favorites
// app.delete('/users/:username/favourites/:title', (req, res) => {
// res.send('Successful DELETE request removing movie by title' + req.params.title + 'from list of favourites' + req.params.username); });
//
// //Allow existing users to deregister
// app.delete('/users/:username', (req, res) => {
// res.send('Successful DELETE request removing user: ' + req.params.username + ' from database');
// });

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
