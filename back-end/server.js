'use strict';

// [START app]
const express = require('express');
const sqlite3 = require('sqlite3')
const app = express();

app.get('/getHalls', (req, res) => {
  console.log("Fetching the list of halls")
  let db = new sqlite3.Database("./movies-database.sqlite")
  db.all
  (`
      SELECT id, name from halls 
  `, (error, row) => {
      if (error) {
          console.log(error);
          return
      }
      res.send(row);
  });
});

app.get('/getMovies', (req, res) => {
  console.log("Fetching the list of movies")
  let db = new sqlite3.Database("./movies-database.sqlite")
  db.all
  (`
      SELECT id, name from movies 
  `, (error, row) => {
      if (error) {
          console.log(error);
          return
      }
      res.send(row);
  });
});

app.get('/getShowtime', (req, res) => {
  console.log("Fetching the list of list of showtimes")
  const hallId = req.query.hallId
  const movieId = req.query.movieId

  if (hallId == null || hallId == undefined || movieId == null || movieId == undefined) {
    console.log("Either hall Id or movie Id was wrong supplied")
    res.send([])
    return
  }

  let db = new sqlite3.Database("./movies-database.sqlite")
  db.all
  (`
      SELECT id, timing from showtime_table WHERE hall_id = $hallId AND movie_id = $movieId
  `,
  {
    $hallId : hallId,
    $movieId : movieId
  },
   (error, row) => {
      if (error) {
          console.log(error);
          return
      }
      res.send(row);
  });
});

app.get('/getSeatMap', (req, res) => {
  console.log("getting seat map")
  const showId = req.query.showId
  if (showId == null || showId == undefined ) {
    console.log("Show Id was wrong supplied")
    res.send([])
    return
  }
  let db = new sqlite3.Database("./movies-database.sqlite")
  db.get
  (`
      SELECT id, seat_allocation from seat_map WHERE show_id = $showId
  `,
  {
    $showId : showId
  },
   (error, row) => {
      if (error) {
          console.log(error);
          return
      }
      res.send(row);
  });
});

// Listen to 8080 
// process.env.PORT
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
// [END app]

module.exports = app;