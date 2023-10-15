const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(morgan('common'));

mongoose.connect('mongodb://127.0.0.1:27017/Movie_API', { useNewUrlParser: true, useUnifiedTopology: true });

// Gets the full list of movies
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

// Get data about a single movie by name
app.get('/movies/:name', (req, res) => {
  Movies.findOne({ Title: req.params.name })
      .then((movie) => {
        res.status(201).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// Get data about a genre by name
app.get('/genres/:genre', (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.genre})
      .then((genre) => {
        res.status(201).json(genre.Genre.Description);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// Get data about a director by name
app.get('/directors/:director', (req, res) => {
  Movies.findOne({ "Director.Name": req.params.director})
      .then((director) => {
        res.status(201).json(director.Director.Bio);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

/*
// Allow new users to register
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});*/

// Get full list of users
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

// Allow users to update their user info
app.put('/users/:username/:info_type/:newinfo', async (req, res) => {
  console.log(req.params.info_type);
  console.log(req.params.newinfo);
  /*if (req.params.info_type == "Username")  {
    await Users.findOneAndUpdate({ Username: req.params.newinfo }, { $set:
      {
        Username: req.body.Username
      }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
  }*/
  if (req.params.info_type == "password")  {
    await Users.findOneAndUpdate({ password: req.params.newinfo }, { $set:
      {
        password: req.params.newinfo
      }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
  }/*
  if (req.params.info_type == "Email")  {
    await Users.findOneAndUpdate({ Email: req.params.newinfo }, { $set:
      {
        Email: req.body.Email
      }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
  }
  if (req.params.info_type == "Birthday")  {
    await Users.findOneAndUpdate({ Birthday: req.params.newinfo }, { $set:
      {
        Birthday: req.body.Birthday
      }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
  }*/
  
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