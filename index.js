const express = require('express');
const morgan = require('morgan');
const app = express();

let topMovies= [
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

app.use(morgan('common'));

app.use(express.static('public'));

// GET requests
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});