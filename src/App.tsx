import React, { useState } from 'react';
import './App.css';
import Table from "./components/Table";
import DaysList from "./components/DaysList";

function App() {
  const [inputStart, changeStart] = useState('00:00')
  const [inputEnd, changeEnd] = useState('23:00');
  const [isFilling, changeFilling] = useState(false);
  const [isClearing, changeClearing] = useState(false)

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
            <button className='button-fill' onClick={e => changeFilling(true)} >aeee</button>
            <button className='button-fill' onClick={e => changeFilling(false)} >offfff</button>
        </div>
    </div>
  );
}

export default App;
