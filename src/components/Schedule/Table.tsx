import React, {useState} from 'react';
import './Table.less';
import Cell from "./Cell";
import TimeLine from './TimeLine';

type TableProps = {
    start: string,
    end: string,
    isFilling?: boolean
}

//state contains in status
//for rendering used rerender 

const hours = 24, days = 7;
let status: boolean[][] = [];
for (let i = 0; i < hours; i++){
    status[i] = [];
    for (let j = 0; j < days; j++){
        status[i][j] = false;
    }
}

function Table({start, end, isFilling}: TableProps) {
    const [rerender, emitRender] = useState(false);
    
    let cells: any[][] = [];
    refreshTable();

    function handleChangeStatus(hour: number, day: number) {
        status[hour][day] = !status[hour][day]
        emitRender(!rerender);
    }

    function refreshTable() {
        cells = []
        const [hoursStart, startMin] = start.split(':').map(e => Number(e))
        const [hoursEnd, endMin] = end.split(':').map(e => Number(e))
        const isStartBigger = hoursStart > hoursEnd;
        const call = (param: number, isBigger: boolean): boolean => {
            if(isBigger)
                return true;
            return param <= hoursEnd;
        }
        for(let i = 0; i < days; i++) {
            cells.push([]);
            let tmpBigger = isStartBigger;
            for (let j = hoursStart; call(j, tmpBigger); j++) {
                if(j !== hoursStart && j !== hoursEnd) {
                    cells[i].push(<Cell hour={j} day={i} key={i + j.toString()}
                                       change={handleChangeStatus} isChecked={status[j][i]} />);
                } else {
                    if(j === hoursStart) {
                        cells[i].push(<Cell hour={j} day={i} key={i + j.toString()}
                                           change={handleChangeStatus} isChecked={status[j][i]}
                                           startMin={startMin} />);
                    } else {
                        cells[i].push(<Cell hour={j} day={i} key={i + j.toString()}
                                           change={handleChangeStatus} isChecked={status[j][i]}
                                           endMin={endMin} />);
                    }
                }
                if(tmpBigger && j === 23) {
                    tmpBigger = false;
                    j = -1;
                }
            }
        }
    }
    
    React.useEffect(() => {
        for (let i = 0; i < hours; i++){
            status[i] = [];
            for (let j = 0; j < days; j++){
                status[i][j] = !!isFilling;
            }
        };
        refreshTable(); 
        emitRender(!rerender);
    }, [isFilling]);
    
    return (
        <>
            <div className='flex-container'>
                <div className='table' >
                    <TimeLine start={start} end={end} />
                    {cells.map(el => <div className={`row ${rerender ? 'rerender': 'rerender1'}`}>{el}</div>)}
                </div>
            </div>
        </>
    );
}

export default Table;
