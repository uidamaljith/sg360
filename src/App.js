import React, { useState, useEffect } from 'react';
import './App.scss';
import MainNav from "./components/Aside/MainNav";
import Dashboard from './components/Dashboard/Dashboard';
import SignInSide from './components/Login/SignIn';

// import Login from './components/Login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import { RequireAuth } from './components/RequireAuth'
const axios = require('axios').default;
function App() {
  axios.interceptors.request.use(function (config) {
    config.headers.Token = localStorage.token;
    config.headers.schoolCode = localStorage.schoolCode;
    return config;
  });
  const [token, setToken] = useState(false)
  console.log('app')
  useEffect(() => {
    let isLogin = (localStorage.token && localStorage.token !== '') ? true : false;
    setToken(isLogin)
  })
  return (
    <AuthProvider>
      <Router>
        <div className="wrapper">
          {token ? (<MainNav />) : ('')}
          <Routes>
            <React.Fragment>
              <Route path="/dashboard" exact element={<RequireAuth> <Dashboard /></RequireAuth>} />
              <Route path="/login" exact element={<SignInSide />} />
            </React.Fragment>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;
