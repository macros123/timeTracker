import React, {MouseEventHandler, useState} from 'react';
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
    (hour: number, day: number ): void
}

function Cell({hour, day, change, isChecked, startMin, endMin}: CellProps) {
    const [check, setCheck] = useState(isChecked);

   function handleClick() {
       change(hour, day);
       setCheck(!check);
   }

    const classN = check ? 'checked Cell' : 'Cell';
   let shrink = '';
    if(startMin)
        shrink = ` width${Math.floor(startMin/15)}`;
  return (
    <div className={classN + shrink} onClick={event => handleClick()}>
        {startMin && classN}
    </div>
  );
}

export default Cell;
