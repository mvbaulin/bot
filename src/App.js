/* eslint-disable react-hooks/exhaustive-deps */

import {React, useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header';
import { useTelegram } from './hooks/useTelegram';
import Button from './components/Button/Button';

function App() {
  const {tg, onToggleButton} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])
  
  return (
    <div className="App">
      <Header />

      <Button onClick={onToggleButton}>toggle</Button>
    </div>
  );
}

export default App;
