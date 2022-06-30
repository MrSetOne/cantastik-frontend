import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import LogPage from './components/LogPage/LogPage';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/logpage" element={<LogPage/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
