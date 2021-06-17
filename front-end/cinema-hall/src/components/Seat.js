import '../style/Seat.css'
import React, {useEffect, useState} from 'react'
import { SEAT_CATEGORIES, CSS_BORDER_AND_SEAT_SIZE_CLASS } from '../constants/Constants.js'

function Seat(props) {

    const [seatCategory, setSeatCategory] = useState(props.seatCategory);

    useEffect(() => {
        // console.log(props.seatCategory);
        setSeatCategory(props.seatCategory);
    }, [props.seatCategory]);

    // Need to check how can we make this better
    useEffect(() => {
        // Basically Seat must know which show it is referring to, if the base show change then it must set itself to
        // the seatCategory passed by seatManager 
        setSeatCategory(props.seatCategory);
    }, [props.showId]);

    let seatSelector = () => { 
        // flipping state of unreserved seat function if updatable
        if (seatCategory === SEAT_CATEGORIES.unreservedSeat && props.acquire()) 
            setSeatCategory(SEAT_CATEGORIES.selectedSeat)
        if (seatCategory === SEAT_CATEGORIES.selectedSeat && props.freeUp()) 
            setSeatCategory(SEAT_CATEGORIES.unreservedSeat)
    }
    
    if (props.showId === -1) 
        return (<></>);
    return (  
        <div className={`${seatCategory} ${CSS_BORDER_AND_SEAT_SIZE_CLASS}`} onClick={seatSelector} />
      );

}

export default Seat;