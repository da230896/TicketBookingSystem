import React, {useState} from 'react';
import './../style/Global.css'

function dropdown(props) {

    return (
        <select className="margin">
            { props.options.map((opt, idx) => <option key={idx}>{opt}</option> )}
        </select>

    );

}


export default dropdown;