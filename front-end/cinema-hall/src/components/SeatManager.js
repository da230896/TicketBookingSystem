import React, { useState } from 'react';
import '../style/SeatManager.css';
import Seat from './Seat';
import {SEAT_CATEGORIES} from '../constants/Constants.js'

// This implementation is totally not efficient-- 1st iteration it is.

function getSeatComponent(seatAvailability, idx, acquire, freeUp) {
  if (!seatAvailability)
    return <Seat key={idx} seatCategory={SEAT_CATEGORIES.unreservedSeat} acquire={acquire} freeUp={freeUp}/>
  else
    return <Seat key={idx} seatCategory={SEAT_CATEGORIES.reservedSeat} acquire={acquire} freeUp={freeUp}/>
}

function SeatManager() {

  // here i need to fetch based on the drop down selection.
  // drop down can be for movie, hall, and showtime.
  const [tempSeatArray, setTempSeatArray] = useState([0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0])
  const [globalSelectedSeatCount, setGlobalSelectedSeatCount] = useState(0);

  let acquire = () => {
    if (globalSelectedSeatCount < 6){
      setGlobalSelectedSeatCount(globalSelectedSeatCount + 1)
      return true
    }
    return false;
  }

  let freeUp = () => {
    if (globalSelectedSeatCount > 0){
      setGlobalSelectedSeatCount(globalSelectedSeatCount - 1)
      return true
    }
    return false;
  }

  console.log(tempSeatArray)
  return (
    <React.Fragment>
      {/* this is very verbose way of dividing seats in three rows... Need to check how to make it better */}
      <div className="inline-display">
        {
          tempSeatArray.slice(0,4).map((seat, idx) => getSeatComponent(seat, idx, acquire, freeUp))
        }
      </div>
      <div className="inline-display">
        {
          tempSeatArray.slice(4,8).map((seat, idx) => getSeatComponent(seat, idx, acquire, freeUp))
        }
      </div>
      <div className="inline-display">
        {
          tempSeatArray.slice(8,12).map((seat, idx) => getSeatComponent(seat, idx, acquire, freeUp))
        }
      </div>
      <div className="inline-display">
        {
          tempSeatArray.slice(12,16).map((seat, idx) => getSeatComponent(seat, idx, acquire, freeUp))
        }
      </div>
    </React.Fragment>
  );
}

export default SeatManager;
