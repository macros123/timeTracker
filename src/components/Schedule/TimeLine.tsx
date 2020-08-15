import React from 'react';
import './TimeLine.less';
import HourElement from './HourElement';
import {callbackCondition} from '../types/helpers'

type TimeProps = {
    start: string,
    end: string
}

type ArrayOfTimes = {
    hour: number,
    minutes?: number,
    isOneHour?: boolean
}

function TimeLine({start, end}: TimeProps) {    
    const [hoursStart, startMin] = start.split(':').map(e => Number(e))
    const [hoursEnd, endMin] = end.split(':').map(e => Number(e))

    const rows: ArrayOfTimes[] = [];
    let isStartBigger = hoursStart > hoursEnd;

    
    for (let j = hoursStart; callbackCondition(j, isStartBigger, hoursEnd); j+=2) {
        if(j !== hoursStart && j !== hoursEnd  && j+1 !== hoursEnd ) {
            rows.push({hour: j});
        } else {
            if(j === hoursStart) {
                rows.push({hour: j, minutes: startMin});
            } else {
                rows.push({hour: j, minutes: endMin, isOneHour: j === hoursEnd})
            }
        }
        if(isStartBigger && j === 23) {
            isStartBigger = false;
            j = -1;
        }
        if(isStartBigger && j === 22) {
            isStartBigger = false;
            j = -2;
        }
    }

    return (
        <div className='TimeLine' >
            {rows.map(el => <HourElement hour={el.hour} minutes={el.minutes || undefined} isOneHour={el.isOneHour}/>)}
        </div>
    );
}

export default TimeLine;
