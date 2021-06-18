import React from 'react';
import './../style/Global.css'

export default function PaymentDetailsBox() {
    return (
        <>
            <label for="payment-details-box" className="margin">Please enter the Payment details</label>
            <input type="password" id="payment-details-box" name="payment-details-box" className="margin"/>
        </>
    )
}