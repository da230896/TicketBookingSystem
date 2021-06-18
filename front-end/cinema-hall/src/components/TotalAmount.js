import React from 'react';
import './../style/Global.css'

export default function TotalAmount(props) {

    return (
        <p className='margin'>Total Amount to be paid is: {props.selectedSeatCount?props.selectedSeatCount*100:0}</p>
    );
}