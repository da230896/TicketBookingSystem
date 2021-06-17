import React from 'react';
import './../style/Global.css'

export default function TotalAmount(props) {

    if (props.amount) {
        return (
            <p className='margin'>Total Amount to be paid is: {props.amount}</p>
        )
    } else {
        return (
            <p className='margin'>Total Amount to be paid is: 0</p>
        )
    }
}