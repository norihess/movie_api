let mongoose = require('mongoose');

//movies
let movieSchema = mongoose.Schema ({
  Title: {type: String, required: true},
  Description: { type: String, require: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

//users
let userSchema = mongoose.Schema ({
  Username: { type: String, required: true},
  Password: { type: String, required: true},
  Email: { type: String, required: true},
  Birdthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//genre
let genreSchema = mongoose.Schema({
  Name: { type: string, required: true},
  Desciption: { type: string, required: true}
});

//director
let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birth: {type: Date, required: true},
  Death: {type: String, required: true},
});

//create models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

//export models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
