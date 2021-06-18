import React from 'react';
import { useState, useEffect } from 'react';

export default function Countdown ( props ) {

    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        setTimeout(() => {
          setTimeElapsed(timeElapsed + 1000);
        }, 1000);
      });

    return (
        <>
            <div>{(props.time - timeElapsed)/1000} seconds left before you lose these seats</div>
        </>
    );

}