const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

let movies= [
    {
      title: 'The Adjustment Bureau',
      director: 'George Nolfi'
    },
    {
      title: 'The Dark Knight',
      director: 'Christopher Nolan'
    },
    {
      title: 'The Dark Knight Rises',
      director: 'Christopher Nolan'
    },
    {
      title: 'Interstellar',
      director: 'Christopher Nolan'
    },
    {
      title: 'Palm Springs',
      director: 'Max Barbakow'
    },
    {
      title: 'Ocean\'s 11',
      director: 'Steven Soderberg'
    },
    {
      title: 'Donnie Darko',
      director: 'Richard Kelly'
    },
    {
      title: 'Yesterday',
      director: 'Danny Boyle'
    },
    {
      title: 'The Internship',
      director: 'Shawn Levy'
    },
    {
      title: 'Kingsman',
      director: 'Matthew Vaughn'
    }
  ];

// Gets the full list of movies
app.get('/movies', (req, res) => {
  res.send('Successful GET request returning full list of movies');
});

// Get data about a single movie by name
app.get('/movies/:name', (req, res) => {
  res.send('Successful GET request returning data on requested movie: ' + String(req.params.name));
});

// Get data about a genre by name
app.get('/genres/:genre', (req, res) => {
  res.send('Successful GET request returning data on requested genre: ' + String(req.params.genre));
});

// Get data about a director by name
app.get('/directors/:director', (req, res) => {
  res.send('Successful GET request returning data on requested director: ' + String(req.params.director));
});

// Allow new users to register
app.post('/users/:username', (req, res) => {
  res.send("User registration successful");
});

// Allow users to update their user info
app.put('/users/:username/info', (req, res) => {
  res.send("Username successfully updated. New username: " + String(req.params.username));
});

// Allow users to add a movie to their list of favorites
app.post('/users/:username/favorites', (req, res) => {
  res.send("Movie successfully added to favorites list");
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:username/favorites/:movie_to_delete', (req, res) => {
  res.send(String(req.params.movie_to_delete) + " successfully removed favorites list");
});

// Allow users to deregister	
app.delete('/users/:username', (req, res) => {
  res.send("User deregistration successful");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});