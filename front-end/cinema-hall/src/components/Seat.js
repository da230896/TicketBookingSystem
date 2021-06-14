import '../style/Seat.css'
import React, {useState} from 'react'
import { SEAT_CATEGORIES, CSS_BORDER_AND_SEAT_SIZE_CLASS } from '../constants/Constants.js'

function Seat(props) {

    const [seatCategory, setSeatCategory] = useState(props.seatCategory)

    let seatSelector = () => { 
        // flipping state of unreserved seat function if updatable
        if (seatCategory === SEAT_CATEGORIES.unreservedSeat && props.acquire()) 
            setSeatCategory(SEAT_CATEGORIES.selectedSeat)
        if (seatCategory === SEAT_CATEGORIES.selectedSeat && props.freeUp()) 
            setSeatCategory(SEAT_CATEGORIES.unreservedSeat)
     }
    return (  
        <div className={`${seatCategory} ${CSS_BORDER_AND_SEAT_SIZE_CLASS}`} onClick={seatSelector} />
      );

}

export default Seat;