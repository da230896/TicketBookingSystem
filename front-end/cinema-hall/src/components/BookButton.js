import React, { useEffect, useState } from 'react';
import './../style/Global.css'
import PaymentDetailsBox from './PaymentDetailsBox';
import Countdown from "react-countdown";
import isValidObject from '../util/valid';

function doNothingAndRefresh() {
    console.log("Happy path executed");
    window.alert("Successful booking");
    //hack right now need to figure out right way
    window.location.replace('https://google.com');
    return;
}

export default function BookButton(props) {

    const [counterFragment, setCounterFragment] = useState(<></>);
    const generateCounterFragment = () => {
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
          };
        console.log(`trying to hold for ${props.showId} and ${props.selectedSeatIndex}`);
        fetch(`http://localhost:8080/updateReservation?showId=${props.showId}&seatMask=${props.selectedSeatIndex}&book=1`, myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in Holding the tickets");
            }
            return response.json();
        })
        .then(data => {
            props.blockSeatsForSelection(false);
            console.log("The request is on hold", data);
        })
        .catch(err => {
            if (isValidObject(props.selectedSeatIndex) && props.selectedSeatIndex == 0) {
                window.alert("Next time select Some seats please");
                window.location.reload();
            } else {
                // Seats not available
                // Hard refresh the page here
                window.alert("Seats not available");
                window.location.reload();
            }
            return;
        });
        // held those seats
        // need to set up call back from timers and completion
        setCounterFragment(
            <>
                <PaymentDetailsBox/>
                <Countdown date={Date.now() + 120_000} className="margin">
                    left to enter Details and confirm booking
                </Countdown>
                <br/><br/>
                {/* Can simulate here payment api giving errors btw */}

                {/* Error here */}
                <button onClick={doNothingAndRefresh}>Done</button>
            </>
        );
        // error condition of done not clicked in 2  mins
        setTimeout(() => {
            if (props.showId === -1 || props.selectedSeatIndex === -1)
                return;
            var myInit = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
              };
            console.log(`trying to unreserve for ${props.showId} and ${props.selectedSeatIndex}`);
            fetch(`http://localhost:8080/updateReservation?showId=${props.showId}&seatMask=${props.selectedSeatIndex}&book=0`, myInit)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response failure while un-booking the reserved seats");
                }
                return response.json();
            })
            .then(data => {
                console.log("seats unreserved successfully", data);
            })
            .catch(err => {
                // TODO replay mechanism or debugging
                window.alert("Failed to un-reserve Seats for this user");
                window.location.reload();
                return;
            });
        }, 120_000);
        
    };
    
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