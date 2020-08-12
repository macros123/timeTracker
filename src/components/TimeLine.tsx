import React from 'react';
import './TimeLine.css';
import HourElement from './HourElement';

type TableProps = {
    start: string,
    end: string
}

type ArrayOfTimes = {
    hour: number,
    mins?: number
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
    //TODO handle 11 30 - 15 30
    for (let j = hoursStart; j <= hoursEnd; j+=2) {
        if(j !== hoursStart && j !== hoursEnd && j+1  !== hoursEnd) {
            rows.push({hour: j});
        } else {
            if(j === hoursStart) {
                rows.push({hour: j, mins: startMin});
            } else {
                rows.push({hour: j, mins: endMin})
            }
        }
    }

    return (
        <div className='TimeLine' >
            {rows.map(el => <HourElement hour={el.hour} mins={el.mins || undefined} />)}
        </div>
    );
}

export default TimeLine;
