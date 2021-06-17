import React, { useState } from "react";
import DropDownManager from "./DropDownManager";
import SeatManager from "./SeatManager";

export default function GlobalManager() {
    //Storing in global since it can be used somewhere else, what is finally selected
    const [selection, setSelection] = useState({hallId: -1, movieId: -1, showId: -1});
    const setHallId = (id) => {
        setSelection({...selection, hallId:id});
    }
    const setMovieId = (id) => {
        setSelection({...selection, movieId:id});
    }

    const setShowId = (id) => {
        setSelection({...selection, showId:id});
    }

    return (
        <React.Fragment>
            <DropDownManager setHallId={setHallId} setMovieId={setMovieId} setShowId={setShowId} selection={selection}/>
            <SeatManager showId={selection.showId}/>
        </React.Fragment>
    );
}