import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const axios = require('axios').default;
  const [domain, setDomain] = useState('https://prod.schoolguard360.com')
  const [userName, setUserName] = useState("")
  const [userPassword, setPassword] = useState("")
  const [companyCode, setCompanyCode] = useState("123")
  const [header, setHeader] = useState("")
  const nav = useNavigate();
  localStorage.setItem("domain", "https://prod.schoolguard360.com")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search) // id=123
    let code = params.get('schoolCode')
    console.log(companyCode);
    //setCompanyCode(code);
    localStorage.removeItem("token");
  })

  async function getAuth(company) {
    try {
      const response = await axios.get(`${domain}/sgpublicservice/public/${companyCode}/preload`);
      console.log(response);
      console.log(response.data.data.Domain);
      if (response.data.data.Domain) {
        setDomain(response.data.data.Domain);
        localStorage.setItem("domain", response.data.data.Domain)
      }
      login(response.data.data.Domain);
    } catch (error) {
      console.error(error);
    }
  }
  async function login(domainname) {
    try {
      const response = await axios.post(`https://${domainname}/sgservice/public/login/${userName}`, {
        password: userPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'schoolCode': companyCode
        }
      });
      console.log(response.headers);
      localStorage.setItem("token", response.headers.token);
      localStorage.setItem("schoolCode", companyCode);
      nav("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }
  // const changeUserName = e => {
  //   setUserName(e.target.value);
  // }
  // const changePassword = e => {
  //   setPassword(e.target.value);
  // }
  // const changeCompanyCode = e => {
  //   console.log(companyCode)
  //   setCompanyCode(e.target.value);
  //   console.log(companyCode)
  // }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userName, userPassword);
    getAuth(companyCode);
  }
  return (
    <div className="MainContainer dashboard">
      <form onSubmit={submitHandler}>
        <label for="username"></label>User:<br />
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
