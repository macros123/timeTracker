import React from 'react';
import './DaysList.css';

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function DaysList() {

    return (
        <div className='DaysList' >
            {weekDays.map(el => <div className='DayElement'>{el}</div>)}
        </div>
    );
}

export default DaysList;
