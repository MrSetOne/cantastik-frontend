import React, { useEffect } from 'react';
import './App.css';
import "antd/dist/antd.css";
import LogPage from './components/LogPage/LogPage';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { newInfo } from './features/auth/authSlice'
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';



function App() {
  const { user, isLoading } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(newInfo())
  },[])

  return (
    <div className="App">
      <div className='spinner__container' style={{display:isLoading?"flex":"none"}}>
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {user?
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
        :
        <>
          <NavBar/>
          <LogPage/>
        </>
      }
    </div>
  );
}

export default App;
