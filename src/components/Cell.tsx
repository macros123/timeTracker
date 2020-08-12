import React, { useState } from 'react';
import './Cell.css';

interface CellProps {
    hour: number,
    day: number,
    change: changeStatus,
    isChecked: boolean,
    startMin?: number,
    endMin?: number
}

interface changeStatus {
    (hour: number, day: number): void
}

function Cell({ hour, day, change, isChecked, startMin, endMin }: CellProps) {
    const [check, setCheck] = useState(isChecked);

    function handleClick() {
        change(hour, day);
        setCheck(!check);
    }

    let width = '33px';
    if(startMin) 
        width =  `${Math.floor(startMin / 1.82)}px`
    if(endMin)
        width =  `${Math.floor(endMin / 1.82)}px`
    const styles = {
        width: width
    }
    return (
        <div className={check ? 'checked Cell' : 'Cell'} onClick={event => handleClick()} style={styles}>
        </div>
    );
}

export default Cell;
