import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.scss';
import MainNav from "./components/Aside/MainNav";
import Dashboard from './components/Dashboard/Dashboard';
import Emergency from './components/Emergency/Emergency';
import SignInSide from './components/Login/Login'

function App() {
  return (
    <div className="App">
      
      
      {/* <MainNav /> */}
      {/* <Dashboard /> */}
      {/* <Emergency /> */}
      <SignInSide />
      

    </div>
  );
}

export default App;
