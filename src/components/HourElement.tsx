import React from 'react';
import './HourElement.css';

interface HourElementProps {
    hour: number,
    mins?: number
}

function HourElement({ hour, mins }: HourElementProps) {


    let width = '68px';
    if(mins) 
        width =  `${Math.floor(mins / 1.82)+33}px`;
    const styles = {
            width: width
        }
    return (
        <div className='Time' style={styles}>
            {hour}-{mins}
        </div>
    );
}

export default HourElement;
