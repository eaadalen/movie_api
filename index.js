const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const { check, validationResult } = require('express-validator');
const Movies = Models.Movie;
const Users = Models.User;
const app = express();
const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234', 'http://localhost:4200', 'https://myflix-client-eaadalen.netlify.app', 'https://eaadalen.github.io'];
const port = process.env.PORT || 8080;
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(morgan('common'));
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

mongoose.connect("mongodb+srv://eaadalen112:BL_Pgv1aadV8WeF@movie-api.hewzgmc.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// Greeting message
app.get('/', (req, res) => {
  res.send("Hello");
});

/**
 * Handle GET requests to access all movies.
 *
 * @function
 * @name getAllMovies
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the movie request process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @returns {Object}[] allMovies - The array of all movies in the database.
 * 
 */
// Gets the full list of movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

/**
 * Handle GET requests to access for a specific movie.
 *
 * @function
 * @name getMovie
 * @param {Object} req - Express request object with parameter: movieId (movie ID).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the movie request process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @returns {Object} reqMovie - The object containing the data for the requested movie.
 * 
 */
// Get data about a single movie by ID
app.get('/movies/:movieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ _id: req.params.movieID })
      .then((movie) => {
        res.status(201).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

/**
 * Handle GET requests to access for a specific genre.
 *
 * @function
 * @name getGenre
 * @param {Object} req - Express request object with parameter: genreName (genre name).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the genre request process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @returns {Object} reqGenre - The object containing the data for the requested genre.
 * 
 */
// Get data about a genre by name
app.get('/genres/:genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.genre})
      .then((genre) => {
        res.status(201).json(genre.Genre.Description);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

/**
 * Handle GET requests to access for a specific director.
 *
 * @function
 * @name getDirector
 * @param {Object} req - Express request object with parameter: directorName (director name).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the director request process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @returns {Object} reqDirector - The object containing the data for the requested director.
 * 
 */
// Get data about a director by name
app.get('/directors/:director', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ "Director.Name": req.params.director})
      .then((director) => {
        res.status(201).json(director.Director.Bio);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

/**
 * Handle GET requests to access all users.
 *
 * @function
 * @name getAllMovies
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the user request process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @returns {Object}[] allUsers - The array of all users in the database.
 * 
 */
// Get full list of users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

/**
 * Handle DELETE requests to delete a user.
 *
 * @function
 * @name deleteUser
 * @param {Object} req - Express request object with parameters: id (user ID).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the user deletion process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @fires {string} message - A message indicating the result of the user deletion process.
 */
// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username})
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

/**
 * Handle DELETE requests to remove a movie from a user's favorites.
 *
 * @function
 * @name removeFavoriteMovie
 * @param {Object} req - Express request object with parameters: id (user ID), movieId (movie ID).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the movie removal process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @fires {Object} updatedUser - The updated user object (after removing the movie) sent in the response on success.
 */
// Allow users to remove a movie from their list of favorites
app.delete('/users/:username/favorites/:movieId',passport.authenticate('jwt', {session: false}),(req, res) => {
    Users.findOneAndUpdate({Username: req.params.username},{$pull: {FavoriteMovies: req.params.movieId}},{new: true})
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }); 
  }
);

/**
 * Handle POST requests to add a movie to a user's favorites.
 *
 * @function
 * @name addFavoriteMovie
 * @param {Object} req - Express request object with parameters: id (user ID), movieId (movie ID).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the movie addition process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @returns {Object} updatedUser - The updated user object (including the added movie) sent in the response on success.
 */
// Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

/**
 * Handle POST requests to create a new user.
 *
 * @function
 * @name createUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the user creation process is complete.
 * @throws {Error} - If there is an unexpected error during the user creation process.
 * @returns {Object} newUser - The newly created user object. Sent in the response on success.
 * 
 */
app.post('/users',
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

  /**
 * Handle PUT requests to update user information.
 *
 * @function
 * @name updateUser
 * @param {Object} req - Express request object with parameters: id (user ID).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the user update process is complete.
 * @throws {Error} - If there is an unexpected error during the process or if permission is denied.
 * @fires {Object} updatedUser - The updated user object sent in the response on success.
 * @description
 *   Expects at least one updatable field (username, password, email, birthday) in the request body.
 */
// Allow users to update their user info
app.put('/users/:Username', 
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], passport.authenticate('jwt', { session: false }), async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  })
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
 });