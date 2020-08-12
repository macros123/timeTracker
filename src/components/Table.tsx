import React, {useEffect, useState} from 'react';
import './Table.css';
import Cell from "./Cell";
import TimeLine from './TimeLine';

type TableProps = {
    start: string,
    end: string
}

const hours = 24, days = 7;
let mas: boolean[][] = [];
for (let i = 0; i < hours; i++){
    mas[i] = [];
    for (let j = 0; j < days; j++){
        mas[i][j] = false;
    }
}

function Table({start, end}: TableProps) {
    const [status, changeStatus] = useState(mas);

    function handleChangeStatus(hour: number, day: number) {
        const tmp = status
        tmp[hour][day] = !tmp[hour][day]
        changeStatus(tmp);
    }

    const [hoursStart, startMin] = start.split(':').map(e => Number(e))
    const [hoursEnd, endMin] = end.split(':').map(e => Number(e))
    const rows: any[][] = [];
    for(let i = 0; i < days; i++) {
        rows[i] = [];
        for (let j = hoursStart; j <= hoursEnd; j++) {
            if(j !== hoursStart && j !== hoursEnd) {
                rows[i][j] = <Cell hour={j} day={i} key={i + j.toString()}
                                   change={handleChangeStatus} isChecked={status[j][i]} />;
            } else {
                if(j === hoursStart) {
                    rows[i][j] = <Cell hour={j} day={i} key={i + j.toString()}
                                       change={handleChangeStatus} isChecked={status[j][i]}
                                       startMin={startMin} />;
                } else {
                    rows[i][j] = <Cell hour={j} day={i} key={i + j.toString()}
                                       change={handleChangeStatus} isChecked={status[j][i]}
                                       endMin={endMin} />;
                }
            }
        }
    }

    return (
        <div className='table' >            
            <TimeLine start={start} end={end} />
            {rows.map(el => <div className='row'>{el}</div>)}
        </div>
    );
}

export default Table;
