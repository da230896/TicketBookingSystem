import React, { useEffect, useState } from 'react';
import './../style/Global.css'
import PaymentDetailsBox from './PaymentDetailsBox';
import Countdown from "react-countdown";

export default function BookButton(props) {

    const [counterFragment, setCounterFragment] = useState(<></>);
    const generateCounterFragment = () => {
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
          };
        fetch(`http://localhost:8080/updateReservation?showId=${props.showId}&seatMask=${props.selectedSeatIndex}&book=1`, myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response failure from fetch");
            }
            return response.json();
        })
        .then(data => {
          console.log("The request is on hold", data);
        })
        .catch(err => console.error(err));
        // held those seats
        // need to set up call back from timers and completion
        setCounterFragment(
            <>
                <PaymentDetailsBox/>
                <Countdown date={Date.now() + 120_000} className="margin">
                    left to enter Details and confirm booking
                </Countdown>
            </>
        );
    };

    useEffect(() => {
        // Need to clean up if the component get updated props viz showtime or seat index
        return () => {
            if (props.showId === -1 || props.selectedSeatIndex === -1)
                return;
            var myInit = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
              };
            fetch(`http://localhost:8080/updateReservation?showId=${props.showId}&seatMask=${props.selectedSeatIndex}&book=0`, myInit)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response failure from fetch");
                }
                return response.json();
            })
            .then(data => {
              console.log("The request is on hold", data);
            })
            .catch(err => console.error(err));
        }
    });
    
    if (props.showId !== -1 && props.selectedSeatIndex !== -1) {
        return (
            <>
                <button type="submit" className="margin" onClick={generateCounterFragment}>Pay</button>
                <br/>
                <div>
                {
                    counterFragment
                }
                </div>
            </>
        );
    } else {
        return (
            <> </>
        );
    }
}