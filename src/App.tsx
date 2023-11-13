import React, { useState } from 'react';
import './App.css';
import List from './components/List';
import Detail from './components/Detail';

function App() {
  const [select, setSelect] = useState({id: -1, name: ''})


  return (
    <div className="App">
      <List setSelect={setSelect}/>
      <Detail info={select} />
    </div>
  );
}

export default App;
