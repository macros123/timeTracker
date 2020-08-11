import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputStart, changeStart] = useState('00:00')
  const [inputLast, changeLast] = useState('23:00')

  function handleChangeStart(e: React.ChangeEvent<HTMLInputElement>) {
    changeStart(e.target.value);
  }
  function handleChangeLast(e: React.ChangeEvent<HTMLInputElement>) {
    changeLast(e.target.value);
  }
  return (
    <div className="App">
      Задать интервал таблицы
      <input type="time" value={inputStart} onChange={handleChangeStart} />-
      <input type="time" value={inputLast} onChange={handleChangeLast} />
    </div>
  );
}

export default App;
