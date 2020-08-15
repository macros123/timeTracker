import React from 'react';
import './HourElement.less';

interface HourElementProps {
    hour: number,
    minutes?: number,
    isOneHour?: boolean
}

function HourElement({ hour, minutes, isOneHour }: HourElementProps) {

    const basis = isOneHour ? 34 : 68;
    const basis1 = isOneHour ? 0 : 34;
    let width = `${basis}px`;
     if(minutes)
         width =  `${Math.floor(minutes / 1.82) + basis1}px`;
    const styles = {
            width: width
        }
    return (
        <div className='Time' style={styles}>
            <div className='hour'>{hour.toString().padStart(2, '0')}</div>
            <div className='minute'>{(minutes && minutes.toString().padStart(2, '0')) || '00'}</div>
        </div>
    );
}

export default HourElement;
