import React, { Component, useEffect } from 'react';
import './App.scss';
import MainNav from "./components/Aside/MainNav";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  let isLogin = (localStorage.token && localStorage.token !== '') ? true : false;
  return (
    <Router>
      <div className="wrapper">
        {isLogin ? (<MainNav />) : ('')}
        <Routes>
          <React.Fragment>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<Login />} />
          </React.Fragment>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
