import React from "react";
import {Link,NavLink,useNavigate} from 'react-router-dom'
import "./MainNav.scss";
import logo from "../../assets/sg360@2x.png";
import { useAuth } from "../Auth";

const axios = require('axios').default;

function MainNav() {
  const nav = useNavigate();
  const auth = useAuth();
  axios.interceptors.request.use(function (config) {
    config.headers.Token = localStorage.token;
    config.headers.schoolCode = localStorage.schoolCode;
    return config;
  });
    const logoutHandler = (e)=> {
        localStorage.removeItem("token");
        nav("/login");
        window.location.reload(false)
        //nav("/login");
      }
  return(
  <aside className="nav">
    <h1>
        {" "}
        <img src={logo} alt="" />
        {/* <span>Survey Builder</span> */}
      </h1>
    <ul>
      <li>
        <Link className="active" to="/dashboard">Home</Link>
      </li>
      <li><a href="http://">Manage Users</a></li>
      <li><a href="http://">Manage Emergency Contacts</a></li>
      <li><a href="http://">Suspicious Activity</a></li>
      <li><a href="" onClick={logoutHandler}>Logout</a> </li>
    </ul>
  </aside>
  )
}

export default MainNav;
