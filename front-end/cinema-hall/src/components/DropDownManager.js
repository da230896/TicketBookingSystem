import React, { useEffect, useState } from 'react';
import DropDown from './DropDown.js';
import isValidObject from '../util/valid.js';

function DropDownManager(props) {
    const [hall, setHall] = useState([]);
    useEffect(() => {
        // Since we are not as such creating objects/connections (tcp connection) we can fire and forget (no clean up)
        // will have to see whether to optimise use effect or not
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
          };
        fetch('http://localhost:8080/getHalls', myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response failure from fetch")
            }
            return response.json();
        })
        .then(data => {
            setHall(data);
        })
        .catch(err => console.error(err));
    }, []);
    // based on simplistic assumption we have all the hall having same movies
    // No filtering is done using hallId
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
          };
        fetch('http://localhost:8080/getMovies', myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response failure from fetch")
            }
            return response.json();
        })
        .then(data => {
            setMovies(data);
        })
        .catch(err => console.error(err));
    }, []);
    // based on selection of movies and hall  
    // we have made filtering functionality only on this but it can be easily extended
    const [showTimes, setShowTimes] = useState([]);
    useEffect(() => {
        if (!(isValidObject(props.selection.hallId) && isValidObject(props.selection.movieId))) {
            return;
        }
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
          };
        // console.log(`Trying to fetch showTimes ${props.selection.hallId} ${props.selection.movieId}`);
        fetch(`http://localhost:8080/getShowtime?hallId=${props.selection.hallId}&movieId=${props.selection.movieId}`, myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response failure from fetch")
            }
            return response.json();
        })
        .then(data => {
            setShowTimes(data);
        })
        .catch(err => console.error(err));
    }, [props.selection.hallId, props.selection.movieId]);

    return (
        <React.Fragment>
            <DropDown options={hall} setSelection={props.setHallId} blockSeatsForBooking={props.blockSeatsForBooking}/>
            <DropDown options={movies} setSelection={props.setMovieId} blockSeatsForBooking={props.blockSeatsForBooking}/>
            <DropDown options={showTimes} setSelection={props.setShowId} blockSeatsForBooking={props.blockSeatsForBooking}/>
        </React.Fragment>
    );
}



export default DropDownManager;