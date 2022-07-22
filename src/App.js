import React, { useState, useEffect } from 'react';
import './App.scss';
import MainNav from "./components/Aside/MainNav";
import Dashboard from './components/Dashboard/Dashboard';
import SignInSide from './components/Login/SignIn';
import Manageusers from './components/Manageusers/Manageusers'
import ManageEmergency from './components/Mangeemergencycontacts/Manageemergency'
// import Login from './components/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import { RequireAuth } from './components/RequireAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;
function App() {
  const [reconnectWs, setReconnectWs] = useState(false);
  const [wrapperBackgorund, setWrapperBackgorund] = useState('wrapper');
  useEffect(() => {
    /*****-----web socket-------------- */
    var ws = new WebSocket('wss://6qi91uwnv0.execute-api.us-east-1.amazonaws.com/Prod');
    ws.onopen = function () {
      ws.send('{"action":"connect"}');
      //document.body.style.backgroundColor = "gray";
    };

    ws.onmessage = function (evt) {
      var received_msg = evt.data;
      if (received_msg === 'initiate') {
        console.log('initiate')
        //window.location.reload(false);
        //document.body.style.backgroundColor = "orange";
        //open modal window saying ockdiown initiated - use toaster
      };
      if (received_msg === 'start') {
        console.log('start')
        startedLockdown('Lockdown started');
        setTimeout(function () {
          window.location.reload(false);
        }, 9000);
        //window.location.reload(false);
        //document.body.style.backgroundColor = "red";
        //open modal window saying ockdiown approved - use toaster
      };
      if (received_msg === 'stop') {
        console.log('stop')
        stoppedLockdown('Lockdown stopped');
        setTimeout(function () {
          window.location.reload(false);
        }, 9000);
        //window.location.reload(false);
        //document.body.style.backgroundColor = "green";
        //open modal window saying ockdiown closed - use toaster
      };
    };

    ws.onclose = function (e) {
      // document.body.style.backgroundColor = "white";
      setTimeout(function () {
        setReconnectWs(true);
      }, 5000);
    };

    ws.onerror = function (err) {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      ws.close();
    };
    /*****-----web socket-------------- */
  }, [reconnectWs])
  const startedLockdown = (msg) => toast.error(msg);
  const stoppedLockdown = (msg) => toast.success(msg);
  //const notify = (msg) => toast.success(msg);


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
  }, [])
  const loginTokenHandler = () => {
    let isLogin = (localStorage.token && localStorage.token !== '') ? true : false;
    setToken(isLogin);
  }
  return (
    <AuthProvider>
      <Router>
        <div className={wrapperBackgorund}>
          <ToastContainer
            position="top-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {token ? (<MainNav />) : ('')}
          <Routes>
            <React.Fragment>
              <Route path="/" exact element={<RequireAuth> <Dashboard /></RequireAuth>} />
              <Route path="/dashboard" exact element={<RequireAuth> <Dashboard /></RequireAuth>} />
              <Route path="/manageusers" exact element={<RequireAuth> <Manageusers /></RequireAuth>} />
              <Route path="/manageEmergency" exact element={<RequireAuth> <ManageEmergency /></RequireAuth>} />
              <Route path="/login" exact element={<SignInSide sendDataToParent={loginTokenHandler} />} />
            </React.Fragment>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;
