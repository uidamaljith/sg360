import React from "react";
import "./MainNav.scss";
import logo from "../../assets/sg360@2x.png";


function MainNav() {
  return(
  <aside className="nav">
    <h1>
        {" "}
        <img src={logo} alt="" />
        {/* <span>Survey Builder</span> */}
      </h1>
    <ul>
      <li className="active"><a href="http://">Home</a></li>
      <li><a href="http://">Manage Users</a></li>
      <li><a href="http://">Manage Emergency Contacts</a></li>
      <li><a href="http://">Suspicious Activity</a></li>
      <li><a href="http://">Logout</a></li>
    </ul>
  </aside>
  )
}

export default MainNav;
