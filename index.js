// let cors = require('cors');
//require()
let http = require('http'),
  fs = require('fs'),
  url = require('url'),
  addr = 'http://localhost:8080/',
  // uuid = require('uuid');
  express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

// app.use(cors());

//mongoose
let mongoose = require('mongoose');
let Models = require('./models.js');

//importing models
let Movies = Models.Movie;
let Users = Models.User;
let Genre = Models.Genre;
let Director = Models.Director;

//adding text-encoder code
// import * as encoding from 'text-encoding';
// import {encode as btoa} from 'base-64';
// var encoder = new encoding.TextEncoder();

//connecting database with connction URI
mongoose.connect('mongodb://localhost:27017/myFlixDB',
{ useNewUrlParser: true, useUnifiedTopology: true });

//downloaded packages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.json());

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(myLogger);
app.use(morgan('common'));

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
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
   Users.findByIdAndUpdate({Username: req.params.Username},
   {
     $push: {FavoriteMovies: req.params.MovieID}
   },
    {new: true}, //this line makes sure that the updated document is returned
   (err, updatedUser) => {
     if(err) {
       console.error(err);
       res.status(500).send('Error: ' + err);
     } else {
       res.json(updatedUser);
     }
   });
 });
 // Delete a user by their username
   app.delete('/users/:Username', (req, res) => {
     Users.findOneAndRemove({ Username: req.params.Username})
     .then((user) => {
       if(!user) {
         res.status(400).send(req.params.Username + ' was not found.');
       } else {
         res.status(200).send(req.params.Username + ' was deleted.');
       }
     })
     .catch((err) => {
       console.error(err);
       res.status(500).send('Error: ' + err);
     });
   });

   // Delete a movie from the favorite list of an user
 app.delete('/users/:Username/movies/:MovieID', (req, res) => {
   Users.findOneAndUpdate({Username: req.params.Username}, {
     $pull: {FavoriteMovies: req.params.MovieID}
   },
   {new: true},
   (err, updatedUser) => {
     if(err) {
       console.error(err);
       res.status(500).send('Error: ' + err);
     } else {
       res.json(updatedUser);
     }
   });
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
