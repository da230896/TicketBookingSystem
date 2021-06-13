import React, { useState } from 'react';
import DropDown from './DropDown.js';

function DropDownManager() {
// Need to have hall fetcher
    const [hall, setHall] = useState(['PVR Prashant Vihar', 'M2K Rohini', 'PVR Naraina vihar'])

    return (
        <DropDown options={hall} />
    );
}



export default DropDownManager;