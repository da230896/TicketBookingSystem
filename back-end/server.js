'use strict';

// [START app]
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/getHalls', (req, res) => {
  console.log("Fetching the list of halls");
  let db = new sqlite3.Database("./movies-database.sqlite");
  db.all
  (`
      SELECT id, name from halls 
  `, (error, row) => {
      if (error) {
          console.log(error);
          res.status(500).send({
            message: "Ehhh"
          });
          return;
      }
      res.send(row);
  });
});

app.get('/getMovies', (req, res) => {
  console.log("Fetching the list of movies");
  let db = new sqlite3.Database("./movies-database.sqlite");
  db.all
  (`
      SELECT id, name from movies 
  `, (error, row) => {
      if (error) {
          console.log(error);
          res.status(500).send({
            message: "Ehhh"
          });
          return;
      }
      res.send(row);
  });
});

app.get('/getShowtime', (req, res) => {
  console.log("Fetching the list of list of showtimes");
  const hallId = req.query.hallId;
  const movieId = req.query.movieId;

  if (hallId == null || hallId == undefined || movieId == null || movieId == undefined) {
    console.log("Either hall Id or movie Id was wrong supplied");
    res.send([]);
    return;
  }

  let db = new sqlite3.Database("./movies-database.sqlite");
  db.all
  (`
      SELECT id, timing from showtime_table WHERE hall_id = $hallId AND movie_id = $movieId
  `,
  {
    $hallId : hallId,
    $movieId : movieId
  },
   (error, rows) => {
      if (error) {
          console.log(error);
          res.status(500).send({
            message: "Ehhh"
          });
          return;
      }
      res.send(rows);
  });
});

app.get('/getSeatMap', (req, res) => {
  console.log("getting seat map");
  const showId = req.query.showId;
  if (showId == null || showId == undefined ) {
    console.log("Show Id was wrong supplied");
    res.send([]);
    return;
  }
  let db = new sqlite3.Database("./movies-database.sqlite");
  db.get
  (`
      SELECT id, seat_allocation from seat_map WHERE show_id = $showId
  `,
  {
    $showId : showId
  },
   (error, row) => {
      if (error) {
        res.status(500).send({
          message: "Ehhh"
        });
        return;
      }
      res.send(row);
  });
});

app.get('/updateReservation', (req, res) => {
  console.log("Trying to Update seat map");
  const showId = req.query.showId;
  const seatMask = parseInt(req.query.seatMask);
  const book = parseInt(req.query.book);
  if (showId == null || showId == undefined || 
    seatMask == null || seatMask == undefined ||
    book == null || book == undefined) {
    console.log("Show Id/Seat Mask/book was wrong supplied");
    res.send([]);
    return;
  }
  // I need to do whole lot of sanity here
  const numSeatsBooked = seatMask.toString(2).match(/1/g).length;
  if (numSeatsBooked >= 6 || numSeatsBooked < 0) {
    console.log(`error request because of mask ${seatMask}`);
    res.status(400).send({
      message: "This is error request"
    });
    return;
  }

  let db = new sqlite3.Database("./movies-database.sqlite");
  // db.on('trace', (data) => {
  //   console.log(data);
  // });
  db.get
  (`
  SELECT seat_allocation FROM seat_map WHERE show_id = $showId
  `,
  {
    $showId : showId
  },
   (error, row) => {
      if (error) {
          console.log(error);
          res.status(500).send({
            message: "Ehhh"
          });
          return;
      }
      if (book && (row.seat_allocation & seatMask)) {
        console.log(`${row.seat_allocation} ${seatMask}`);
        res.status(400).send({
          message: "Few Seats are booked where he has selected: bad luck"
        });
        return;
      } else if (!book && (row.seat_allocation & seatMask)!= seatMask) {
        console.log(`${row.seat_allocation} ${seatMask}`);
        res.status(400).send({
          message: "Few Seats which are sent for un-book were never booked"
        });
        return;
      }

      db.run(`
        UPDATE seat_map 
        SET seat_allocation =
          CASE
            WHEN ($book==1) THEN
                (seat_allocation | $seatMask)
            ELSE
                (seat_allocation & ~$seatMask)
          END
        WHERE show_id = $showId`, {
        $showId : showId,
        $seatMask: seatMask,
        $book: book
      }, (error, row) => {
        if (error) {
          console.log(error);
          res.status(500).send({
            message: "Ehhh"
          });
          return;
        }
        res.send(row);
      });
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