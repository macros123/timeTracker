import React from 'react';
import './TimeLine.css';
import HourElement from './HourElement';

type TableProps = {
    start: string,
    end: string
}

type ArrayOfTimes = {
    hour: number,
    minutes?: number,
    isOneHour?: boolean
}
const hours = 24, days = 7;
let mas: boolean[][] = [];
for (let i = 0; i < hours; i++){
    mas[i] = [];
    for (let j = 0; j < days; j++){
        mas[i][j] = false;
    }
}

function TimeLine({start, end}: TableProps) {

    const [hoursStart, startMin] = start.split(':').map(e => Number(e))
    const [hoursEnd, endMin] = end.split(':').map(e => Number(e))
    const rows: ArrayOfTimes[] = [];
    let isStartBigger = hoursStart > hoursEnd;
    const call = (param: number, isBigger: boolean): boolean => {
        if(isBigger)
            return true;
        return param <= hoursEnd;
    }
    for (let j = hoursStart; call(j, isStartBigger); j+=2) {
        if(j !== hoursStart && j !== hoursEnd ) {
            rows.push({hour: j});
        } else {
            if(j === hoursStart) {
                rows.push({hour: j, minutes: startMin});
            } else {
                rows.push({hour: j, minutes: endMin, isOneHour: j+2 === hoursEnd})
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
