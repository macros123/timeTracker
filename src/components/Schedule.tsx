import React, { useState } from 'react';
import './Schedule.css';
import Table from "./Schedule/Table";
import DaysList from "./Schedule/DaysList";

const argeeImg = (
  <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.26573 9.68389C4.8752 9.29336 4.8752 8.6602 5.26573 8.26967L13.0858 0.44951C13.4763 0.0589853 14.1095 0.058985 14.5 0.449509C14.8905 0.840034 14.8905 1.4732 14.5 1.86372L6.67994 9.68389C6.28942 10.0744 5.65625 10.0744 5.26573 9.68389Z" fill="#12C971"/>
    <path d="M6.67994 9.68389C7.07047 9.29336 7.07041 8.6602 6.67988 8.26967L2.49995 4.08977C2.10943 3.69925 1.47626 3.69925 1.08574 4.08977C0.695216 4.4803 0.695216 5.11346 1.08574 5.50398L5.26573 9.68389C5.65625 10.0744 6.28942 10.0744 6.67994 9.68389Z" fill="#12C971"/>
  </svg>
)

const canselImg = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.2553 11.4588C0.864771 11.0683 0.864771 10.4351 1.2553 10.0446L10.2928 1.00566C10.6833 0.615137 11.3165 0.615138 11.707 1.00566C12.0975 1.39619 12.0975 2.02935 11.707 2.41988L2.66951 11.4588C2.27898 11.8493 1.64582 11.8493 1.2553 11.4588Z" fill="#FF238D"/>
    <path d="M11.6132 11.3963C12.0038 11.0058 12.0038 10.3726 11.6132 9.9821L2.63679 1.00566C2.24627 0.615137 1.6131 0.615138 1.22258 1.00566C0.832056 1.39619 0.832056 2.02935 1.22258 2.41988L10.199 11.3963C10.5896 11.7868 11.2227 11.7868 11.6132 11.3963Z" fill="#FF238D"/>
  </svg>
)

type boolUndef = boolean | undefined;
const start: boolUndef = undefined;

function Schedule() {
  const [inputStart, changeStart] = useState('00:00')
  const [inputEnd, changeEnd] = useState('23:00');
  const [isFilling, changeFilling] = useState(start);

  function handleChangeStart(e: React.ChangeEvent<HTMLInputElement>) {
    changeStart(e.target.value);
  }
  function handleChangeEnd(e: React.ChangeEvent<HTMLInputElement>) {
    changeEnd(e.target.value);
  }

  return (
    <div className="App">
        <div className='header'>
          <h2>График работы предприятия</h2>
          Задать интервал таблицы
          <input type="time" value={inputStart} onChange={handleChangeStart} />-
          <input type="time" value={inputEnd} onChange={handleChangeEnd} />
        </div>
      <div className='container'>
          <DaysList />
          <Table start={inputStart} end={inputEnd} isFilling={isFilling}/>
      </div>
        <div className='button-group'>
            <div className='my-button button-fill' onClick={e => changeFilling(true)} >
              {argeeImg}
              Заполнить автоматически
            </div>
            <div className='my-button button-clear' onClick={e => changeFilling(isFilling === undefined ? false : undefined)} >
              {canselImg}
              Очистить
            </div>
        </div>
    </div>
  );
}

export default Schedule;
