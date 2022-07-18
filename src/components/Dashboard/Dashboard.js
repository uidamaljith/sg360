import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import Emergency from "../Emergency/Emergency"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid } from "@mui/material";
const axios = require('axios').default;

function Dashboard() {
  const [emergency, setEmergency] = useState({});
  const [isEmergencyInfo, setIsEmergencyInfo] = useState(false);
  const [emergencyStatus, setEmergencyStatus] = useState(false);
  const [closedEmergencyHistory, setClosedEmergencyHistory] = useState([]);
  const [lockdownInfo, setLockdownInfo] = useState([]);
  const [staffDetails, setStaffDetails] = useState([]);
  const domain = localStorage.domain;
  const fullDomain = `https://${domain}`
  const schoolCode = localStorage.schoolCode;
  console.log(domain, schoolCode)
  useEffect(() => {
    getOpenEmergencey();
    getInProgressEmergenceyStatus();
    getClosedEmergencey();
  }, [])
  async function getOpenEmergencey() {
    try {
      const response = await axios.get(`${fullDomain}/sgservice/report/list/open`, {
        headers: {
          "Token": localStorage.token,
          "schoolCode": localStorage.schoolCode
        }
      });
      setEmergency(response.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  async function getInProgressEmergenceyStatus() {
    try {
      const response = await axios.get(`${fullDomain}/sgservice/lockdown/status`);
      setEmergencyStatus(response.data.data)
      if (response.data) {
        getEmergenceyDetails();
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getEmergenceyDetails() {
    try {
      const response = await axios.get(`${fullDomain}/sgservice/lockdown/detail`);
    } catch (error) {
      console.error(error);
    }
  }
  async function getClosedEmergencey() {
    try {
      const response = await axios.get(`${fullDomain}/sgservice/lockdown/history`);
      console.log(response.data.data);
      setClosedEmergencyHistory(response.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  async function getLockDownInfoDetails(lockdownId) {
    try {
      const response = await axios.get(`${fullDomain}/sgservice/lockdown/id?lockdownId=${lockdownId}`);
      getLockDownInfo(lockdownId)
      setLockdownInfo(response.data.data)
    } catch (error) {
      console.error(error);
    }
  }

  async function getLockDownInfo(lockdownId) {
    try {
      const response = await axios.get(`${fullDomain}/sgservice/safety/statusSummary/?lockdownId=${lockdownId}`);
      console.log(response.data.data);
      setStaffDetails(response.data.data);
      setIsEmergencyInfo(true)
    } catch (error) {
      console.error(error);
    }
  }
  const backToDashboard = () => {
    console.log("back"); // the callback. Use a better name
    setIsEmergencyInfo(false);
  };
  // getClosedEmergencey(){ }
  return (
    <>
      {
        !isEmergencyInfo ? <div className="MainContainer dashboard">
          <header>
            <h2>Dashboard</h2>
          </header>
          <div className="content-section">
            <div className="section-column sp-acivity">
              <h3>Open Suspicious Activity</h3>
              <Card sx={{ minWidth: 275 }} className="susp-chat">
                <CardContent>
                  <div className="icon-mui">
                    <ChatBubbleOutlineIcon sx={{ fontSize: 30 }} />
                  </div>

                  <div className="chat-box">
                    {emergency ? (
                      <>
                        <h4>{emergency.report ? emergency.report : ''}<ChevronRightIcon /></h4>
                        <h5 className="author">
                          <label>Andrew Hoggard,</label>&nbsp;<span>Jun 5, 2020,</span>
                          &nbsp;<span>08:50 AM</span>
                        </h5>
                      </>

                    ) : (
                      <h4>No data found</h4>
                    )}

                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="section-column">
              <h3>In Progress Emergency</h3>
              <div className="pro-eme-container">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }} className="pro-eme">
                      <CardContent>
                        <div className="pro-eme-single">
                          {emergencyStatus ? <>
                            <h4>Intruder <ChevronRightIcon /></h4>
                            <h5 className="author">
                              <LocationOnOutlinedIcon sx={{ fontSize: 24 }} />
                              <label>Baseball court</label>
                            </h5>
                            <h5 className="author">
                              <AccessTimeIcon sx={{ fontSize: 24 }} />
                              <span>Jun 5, 2020,</span>&nbsp;<span>08:50 AM</span>
                              <span>{ }</span>
                            </h5>
                          </> : <h4>No emergency data found</h4>
                          }

                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="section-column">
              <h3>Closed Emergency</h3>
              <div className="close-eme-container">
                <Grid container spacing={2}>
                  {closedEmergencyHistory.map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Card sx={{ minWidth: 275 }} className="pro-eme">
                        <CardContent>
                          <div className="pro-eme-single" onClick={() => getLockDownInfoDetails(item.lockdownId)}>
                            <h4>{item.incidentType} <ChevronRightIcon /></h4>
                            <h5 className="author">
                              <LocationOnOutlinedIcon sx={{ fontSize: 24 }} />
                              <label>Baseball court</label>
                            </h5>
                            <h5 className="author">
                              <AccessTimeIcon sx={{ fontSize: 24 }} />
                              <span>Jun 5, 2020,</span>&nbsp;<span>08:50 AM</span>
                            </h5>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>

                  ))}
                </Grid>
              </div>
            </div>
          </div>

        </div> : <Emergency staffdeatils={staffDetails} details={lockdownInfo} sendDataToParent={backToDashboard} ></Emergency>
      }
    </>


  );
}

export default Dashboard;
