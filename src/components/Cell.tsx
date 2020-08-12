import React, {MouseEventHandler} from 'react';
import './Cell.css';

interface CellProps {
    hour: string,
    day: string,
    change: changeStatus
}

interface changeStatus {
    (params: React.MouseEvent<HTMLDivElement, MouseEvent> ): void
}

function Cell({hour, day, change}: CellProps) {
  return (
    <div className="Cell" onClick={event => change(event)}>
    </div>
  );
}

export default Cell;
