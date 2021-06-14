import React from 'react';
import './../style/Global.css'

export default function PaymentDetailsBox() {
    return (
        <React.Fragment>
            <label for="payment-details-box" className="margin">Please enter the payment details</label>
            <input type="password" id="payment-details-box" name="payment-details-box" className="margin"/>
        </React.Fragment>
    )
}