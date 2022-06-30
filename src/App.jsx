import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import LogPage from './components/LogPage/LogPage';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <LogPage/>
    </div>
  );
}

export default App;
