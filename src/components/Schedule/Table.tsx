import React, {useState, useCallback, useEffect} from 'react';
import './Table.css';
import Cell from "./Cell";
import TimeLine from './TimeLine';


type TableProps = {
    start: string,
    end: string,
    isFilling?: boolean
}

const hours = 24, days = 7;
let mas: boolean[][] = [];
for (let i = 0; i < hours; i++){
    mas[i] = [];
    for (let j = 0; j < days; j++){
        mas[i][j] = false;
    }
}
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}
function Table({start, end, isFilling}: TableProps) {
    const [status, changeStatus] = useState(mas);

    const forceUpdate = useForceUpdate();
    function handleChangeStatus(hour: number, day: number) {
        const tmp = status
        tmp[hour][day] = !tmp[hour][day]
        changeStatus(tmp);
        refreshTable();
        forceUpdate()
    }
    React.useEffect(() => {
        for (let i = 0; i < hours; i++){
            mas[i] = [];
            for (let j = 0; j < days; j++){
                mas[i][j] = !!isFilling;
            }
        };
        changeStatus(mas);
        refreshTable();
        forceUpdate()
    }, [isFilling]);

    let rows: any[][] = [];
    refreshTable();
    function refreshTable() {
        rows = []
        const [hoursStart, startMin] = start.split(':').map(e => Number(e))
        const [hoursEnd, endMin] = end.split(':').map(e => Number(e))
        const isStartBigger = hoursStart > hoursEnd;
        const call = (param: number, isBigger: boolean): boolean => {
            if(isBigger)
                return true;
            return param <= hoursEnd;
        }
        for(let i = 0; i < days; i++) {
            rows.push([]);
            let tmpBigger = isStartBigger;
            for (let j = hoursStart; call(j, tmpBigger); j++) {
                if(j !== hoursStart && j !== hoursEnd) {
                    rows[i].push(<Cell hour={j} day={i} key={i + j.toString()}
                                       change={handleChangeStatus} isChecked={status[j][i]} />);
                } else {
                    if(j === hoursStart) {
                        rows[i].push(<Cell hour={j} day={i} key={i + j.toString()}
                                           change={handleChangeStatus} isChecked={status[j][i]}
                                           startMin={startMin} />);
                    } else {
                        rows[i].push(<Cell hour={j} day={i} key={i + j.toString()}
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
    
    return (
        <>
            <div className='flex-container'>
                <div className='table' >
                    <TimeLine start={start} end={end} />
                    {rows.map(el => <div className='row'>{el}</div>)}
                </div>
            </div>
        </>
    );
}

export default Table;