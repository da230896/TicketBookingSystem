import React, { useEffect, useState } from 'react';
import '../style/SeatManager.css';
import Seat from './Seat';
import {SEAT_CATEGORIES} from '../constants/Constants.js'

// This implementation is totally not efficient-- 1st iteration it is.

function getSeatComponent(seatAvailability, idx, props) {
  // console.log(`idx being sent here is ${idx}. If it is only between [0,3] then will have to do the math`);
  if (!seatAvailability)
    return <Seat key={idx} seatId={idx} seatCategory={SEAT_CATEGORIES.unreservedSeat} acquire={props.acquire} freeUp={props.freeUp} showId={props.showId} blockSeatsForBooking={props.blockSeatsForBooking} />
  else
    return <Seat key={idx} seatId={idx} seatCategory={SEAT_CATEGORIES.reservedSeat} acquire={props.acquire} freeUp={props.freeUp} showId={props.showId} blockSeatsForBooking={props.blockSeatsForBooking}/>
}

function convertIntToSeatMap(integer) {
  let seatArray = [];
  for (let bitNumber = 0; bitNumber <= 15; ++bitNumber) {
    if (integer & (1<<bitNumber)) {
      seatArray.push(1);
    } else {
      seatArray.push(0);
    }
  }
  return seatArray;
}

function SeatManager(props) {

  // here i need to fetch based on the drop down selection.
  // drop down can be for movie, hall, and showtime.
  const [seatArray, setSeatArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
        
    // Since we are not as such creating objects/connections (tcp connection) we can fire and forget (no clean up)
    // will have to see whether to optimise use effect or not
    if (props.showId === -1) {
      return;
    }
    var myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      };
    fetch(`http://localhost:8080/getSeatMap?showId=${props.showId}`, myInit)
    .then(response => {
        if (!response.ok) {
            throw new Error("Response failure from fetch");
        }
        return response.json();
    })
    .then(data => {
      setSeatArray(convertIntToSeatMap(data.seat_allocation))
    })
    .catch(err => console.error(err));
    }, [props.showId]);


  // console.log(seatArray)
  return (
    <React.Fragment>
      {/* this is very verbose way of dividing seats in three rows... Need to check how to make it better */}
      <div className="inline-display">
        {
          seatArray.slice(0,4).map((seat, idx) => getSeatComponent(seat, idx, props))
        }
      </div>
      <div className="inline-display">
        {
          seatArray.slice(4,8).map((seat, idx) => getSeatComponent(seat, 4 + idx, props))
        }
      </div>
      <div className="inline-display">
        {
          seatArray.slice(8,12).map((seat, idx) => getSeatComponent(seat, 8 + idx, props))
        }
      </div>
      <div className="inline-display">
        {
          seatArray.slice(12,16).map((seat, idx) => getSeatComponent(seat, 12 + idx, props))
        }
      </div>
    </React.Fragment>
  );
}

export default SeatManager;
