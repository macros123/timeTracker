import React from 'react';
import './HourElement.css';

interface HourElementProps {
    hour: number,
    minutes?: number,
    isOneHour?: boolean
}

function HourElement({ hour, minutes, isOneHour }: HourElementProps) {

    const basis = isOneHour ? 34 : 68;
    let width = `${basis}px`;
    // if(minutes)
    //     width =  `${Math.floor(minutes / 1.82)+basis}px`;
    const styles = {
            width: width
        }
    return (
        <div className='Time' style={styles}>
            {hour}-{minutes}
        </div>
    );
}

export default HourElement;
