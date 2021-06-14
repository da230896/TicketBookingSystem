import React from 'react';
import './../style/Global.css'

export default function TotalAmount(props) {
    return (
        <p className='margin'>Total Amount to be paid is: {props.amount}</p>
    )
}