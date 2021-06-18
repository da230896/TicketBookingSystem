import React from 'react';
import './../style/Global.css';
import isValidObject from './../util/valid';

function dropdown(props) {

    let option = [];
    if (isValidObject(props.options)) {
        option.push(<option key = {-1} value = {-1}> </option>)
        props.options.forEach(element => {
            if (isValidObject(element.name)) {
                option.push(<option key = {element.id} value = {element.id}>{element.name}</option>)
            } else if (isValidObject(element.timing)) {
                option.push(<option key = {element.id} value = {element.id}>{element.timing}</option>)
            }
        });
    }

    const handleSelection = (event) => {
        if (isValidObject(props.setSelection)) {
            props.setSelection(event.target.value);
        }
    };

    return (
        <select className="margin" onChange={handleSelection}>
            {
                option
            }
        </select>
    );

}


export default dropdown;