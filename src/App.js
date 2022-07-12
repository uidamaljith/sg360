import React, { Component, useEffect } from 'react';
import './App.scss';
import MainNav from "./components/Aside/MainNav";
import Dashboard from './components/Dashboard/Dashboard';

import Emergency from './components/Emergency/Emergency';
import SignInSide from './components/Login/SignIn';

// import Login from './components/Login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  // let isLogin = (localStorage.token && localStorage.token !== '') ? true : false;
  return (

    // <div className="App">
      
      
    //   {/* <MainNav /> */}
    //   {/* <Dashboard /> */}
      // {/* <Emergency /> */}
      <SignInSide />
      

    // </div>

    // <Router>
    //   <div className="wrapper">
    //     {isLogin ? (<MainNav />) : ('')}
    //     <Routes>
    //       <React.Fragment>
    //         <Route path="/" exact element={<Dashboard />} />
    //         <Route path="/dashboard" exact element={<Dashboard />} />
    //         <Route path="/login" exact element={<Login />} />
    //       </React.Fragment>
    //     </Routes>
    //   </div>
    // </Router>

  );
}

export default App;
