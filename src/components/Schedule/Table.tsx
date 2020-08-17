import React, {useState} from 'react';
import './Table.less';
import Cell from "./Cell";
import TimeLine from './TimeLine';
import {callbackCondition} from '../types/helpers'

type TableProps = {
    start: string,
    end: string,
    isFilling?: boolean
}

//initial state contains from status

const hours = 24, days = 7;
let status: boolean[][] = [];
for (let i = 0; i < hours; i++){
    status[i] = [];
    for (let j = 0; j < days; j++){
        status[i][j] = false;
    }
}

function Table({start, end, isFilling}: TableProps) {
    const [stat, changeStatus] = useState(status)
    
    let cells: any[][] = [];
    refreshTable();

    function handleChangeStatus(hour: number, day: number) {
        changeStatus(oldStat => {
            const tmp = oldStat.map((el, i) => {
                return el.map((el1, j) => {
                    return (i === hour && j === day) ? !el1 : el1
                })
            });
            return tmp;            
        })
    }

    function refreshTable() {
        cells = []
        const [hoursStart, startMin] = start.split(':').map(e => Number(e))
        const [hoursEnd, endMin] = end.split(':').map(e => Number(e))
        const isStartBigger = hoursStart > hoursEnd;

        for(let i = 0; i < days; i++) {
            cells.push([]);
            let tmpBigger = isStartBigger;
            for (let j = hoursStart; callbackCondition(j, tmpBigger, hoursEnd); j++) {
                if(j !== hoursStart && j !== hoursEnd) {
                    cells[i].push(<Cell hour={j} day={i} key={i + j.toString()}
                                       change={handleChangeStatus} isChecked={stat[j][i]} />);
                } else {
                    if(j === hoursStart) {
                        cells[i].push(<Cell hour={j} day={i} key={i + j.toString()}
                                           change={handleChangeStatus} isChecked={stat[j][i]}
                                           startMin={startMin} />);
                    } else {
                        cells[i].push(<Cell hour={j} day={i} key={i + j.toString()}
                                           change={handleChangeStatus} isChecked={stat[j][i]}
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
        changeStatus(oldStat => {
            const tmp = oldStat.map(el => {
                return el.map(() => !!isFilling)
            });
            return tmp;            
        });
    }, [isFilling]);
    
    return (
        <>
            <div className='flex-container'>
                <div className='table' >
                    <TimeLine start={start} end={end} />
                    {cells.map(el => <div className={`row`}>{el}</div>)}
                </div>
            </div>
        </>
    );
}

export default Table;
