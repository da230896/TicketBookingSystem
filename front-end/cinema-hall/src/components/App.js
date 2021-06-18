import React, { useState, useEffect } from "react";
import DropDownManager from "./DropDownManager";
import SeatManager from "./SeatManager";
import TotalAmount from './TotalAmount' ;
import BookButton from './BookButton';

export default function App() {
    //Storing in global since it can be used somewhere else, what is finally selected
    const [selection, setSelection] = useState({hallId: -1, movieId: -1, showId: -1});
    const [selectedSeatCount, setSelectedSeatCount] = useState(0);
    const [selectedSeatIndex, setSelectedSeatIndex] = useState(0);

    const setHallId = (id) => {
        setSelection({...selection, hallId:id});
    }
    const setMovieId = (id) => {
        setSelection({...selection, movieId:id});
    }

    const setShowId = (id) => {
        setSelection({...selection, showId:id});
    }


    const acquire = (idx) => {
        if (selectedSeatCount < 6 && idx >= 0 && idx < 16){
          setSelectedSeatCount(selectedSeatCount + 1);
          setSelectedSeatIndex(selectedSeatIndex | (1<<idx));
          return true
        }
        return false;
      }
    
    const freeUp = (idx) => {
        if (selectedSeatCount > 0 && idx >= 0 && idx < 16){
          setSelectedSeatCount(selectedSeatCount - 1);
          setSelectedSeatIndex(selectedSeatIndex & ~(1<<idx));
          return true
        }
        return false;
      }

    useEffect(() => {
        setSelectedSeatCount(0);
    }, [selection.hallId, selection.movieId, selection.showId]);

    return (
        <>
            <DropDownManager setHallId={setHallId} setMovieId={setMovieId} setShowId={setShowId} selection={selection}/>
            {/* This is important to see that on change of props we have re render */}
            <SeatManager showId={selection.showId} acquire={acquire} freeUp={freeUp} />
            {/* We can simply extend the logic for pricing based on different hallId, movieId, showId */}
            <TotalAmount selectedSeatCount={selectedSeatCount}/>
            <BookButton selectedSeatIndex={selectedSeatIndex} showId={selection.showId}/>
        </>
    );
}