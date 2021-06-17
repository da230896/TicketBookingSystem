import React, { useEffect, useState } from 'react';
import '../style/SeatManager.css';
import Seat from './Seat';
import {SEAT_CATEGORIES} from '../constants/Constants.js'

// This implementation is totally not efficient-- 1st iteration it is.

function getSeatComponent(seatAvailability, idx, acquire, freeUp, showId) {
  if (!seatAvailability)
    return <Seat key={idx} seatCategory={SEAT_CATEGORIES.unreservedSeat} acquire={acquire} freeUp={freeUp} showId={showId}/>
  else
    return <Seat key={idx} seatCategory={SEAT_CATEGORIES.reservedSeat} acquire={acquire} freeUp={freeUp} showId={showId}/>
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
  const [selectedSeatCount, setSelectedSeatCount] = useState(0);
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

    useEffect(() => {
      setSelectedSeatCount(0);
    }, [seatArray]);


  let acquire = () => {
    if (selectedSeatCount < 6){
      setSelectedSeatCount(selectedSeatCount + 1);
      return true
    }
    return false;
  }

  let freeUp = () => {
    if (selectedSeatCount > 0){
      setSelectedSeatCount(selectedSeatCount - 1);
      return true
    }
    return false;
  }

  // console.log(seatArray)
  return (
    <React.Fragment>
      {/* this is very verbose way of dividing seats in three rows... Need to check how to make it better */}
      <div className="inline-display">
        {
          seatArray.slice(0,4).map((seat, idx) => getSeatComponent(seat, idx, acquire, freeUp, props.showId))
        }
      </div>
      <div className="inline-display">
        {
          seatArray.slice(4,8).map((seat, idx) => getSeatComponent(seat, idx, acquire, freeUp, props.showId))
        }
      </div>
      <div className="inline-display">
        {
          seatArray.slice(8,12).map((seat, idx) => getSeatComponent(seat, idx, acquire, freeUp, props.showId))
        }
      </div>
      <div className="inline-display">
        {
          seatArray.slice(12,16).map((seat, idx) => getSeatComponent(seat, idx, acquire, freeUp, props.showId))
        }
      </div>
    </React.Fragment>
  );
}

export default SeatManager;
