import React, {useState} from 'react';
import './Table.css';
import Cell from "./Cell";

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

    function handleChangeStatus(param: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        console.log(param)
    }

    const [hoursStart, minsStart] = start.split(':').map(e => Number(e))
    const [hoursEnd, minsEnd] = end.split(':').map(e => Number(e))
    let cells = [];
    for(let i = hoursStart; i < hoursEnd; i++) {
        cells.push(<Cell hour={i.toString()} day={'some'} key={i} change={handleChangeStatus}/>);
    }
    return (
        <div className='table' >
            {cells}
        </div>
    );
}

export default Table;
