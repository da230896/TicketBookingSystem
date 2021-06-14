import React, { useState } from 'react';
import DropDown from './DropDown.js';

function DropDownManager() {
// Need to have hall fetcher
    const [hall, setHall] = useState(['PVR Prashant Vihar', 'M2K Rohini', 'PVR Naraina vihar'])
    // based on hall selected get the list of movies
    const [movies, setMovies] = useState(['Nomadland', 'Harry Potter', 'F&F'])
// based on above two get the list of show times 
    const [showTime, setShowTimes] = useState(['10:00 AM', '02:00 PM', '06:00 PM'])

    return (
        <React.Fragment>
            <DropDown options={hall} />
            <DropDown options={movies} />
            <DropDown options={showTime} />
        </React.Fragment>
    );
}



export default DropDownManager;