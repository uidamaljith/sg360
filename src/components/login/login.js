import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Auth'

function Login() {
  const axios = require('axios').default;
  const [user, setUser] = useState('')
  const auth = useAuth();
  const [userName, setUserName] = useState('')
  const [userPassword, setPassword] = useState('')
  const [companyCode, setCompanyCode] = useState('')

  const navigate = useNavigate();
  localStorage.setItem("domain", "https://prod.schoolguard360.com")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search) // id=123
    let code = params.get('schoolCode');
    console.log(companyCode);
    if (localStorage.token) {
      navigate("/dashboard", { replace: true });
    }
    //setCompanyCode(code);
    //localStorage.removeItem("token");
  })

  async function getAuth(company) {
    try {
      const response = await axios.get(`https://prod.schoolguard360.com/sgpublicservice/public/${companyCode}/preload`);
      const domainName = response.data.data.Domain ? response.data.data.Domain : 'prod.schoolguard360.com'
      login(domainName);
    } catch (error) {
      console.error(error);
    }
  }
  async function login(domainname) {
    try {
      const response = await axios.post(`https://${domainname}/sgservice/public/login/+1${userName}`, {
        password: userPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'schoolCode': companyCode
        }
      });
      localStorage.setItem("domain", domainname);
      localStorage.setItem("token", response.headers.token);
      localStorage.setItem("schoolCode", companyCode);
      auth.login(userName);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.removeItem("domain");
    localStorage.removeItem("token");
    getAuth(companyCode);
  }
  return (
    <div className="MainContainer dashboard">
      <form onSubmit={handleLogin}>
        <label for="username"></label>User ID:<br />
        <input type="text" name="username" value={userName} onChange={e => setUserName(e.target.value)} /><br />
        <label for="username">Password:</label><br />
        <input type="password" name="password" value={userPassword} onChange={e => setPassword(e.target.value)} /><br />
        <label for="username">Company Code:</label><br />
        <input type="text" name="companycode" value={companyCode} onChange={e => setCompanyCode(e.target.value)} /><br />
        <input type="submit" name="submit" />
      </form>
    </div>
  );
}

export default Login;
