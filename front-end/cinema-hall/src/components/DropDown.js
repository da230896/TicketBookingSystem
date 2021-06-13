import React, {useState} from 'react';

function dropdown(props) {

    return (
        <select>
            { props.options.map((opt, idx) => <option key={idx}>{opt}</option> )}
        </select>

    );

}


export default dropdown;