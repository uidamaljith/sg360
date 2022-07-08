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
  const token = localStorage.token;
  const domain = localStorage.domain;
  const schoolCode = localStorage.schoolCode;
  console.log(domain, schoolCode)
  useEffect(() => {
    getOpenEmergencey();
    getInProgressEmergencey();
    getClosedEmergencey();
  }, [])
  async function getOpenEmergencey() {
    try {
      const response = await axios.get(`${domain}/sgservice/report/list/open`);
      console.log(response.data.data[0]);
      setEmergency(response.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  async function getInProgressEmergencey() {
    try {
      const response = await axios.get(`${domain}/sgservice/lockdown/status`);
      console.log(response);
      getEmergenceyDetails();
    } catch (error) {
      console.error(error);
    }
  }
  async function getEmergenceyDetails() {
    try {
      const response = await axios.get(`${domain}/sgservice/lockdown/detail`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async function getClosedEmergencey() {
    try {
      const response = await axios.get(`${domain}/sgservice/lockdown/history`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async function getLockDownInfo() {
    setIsEmergencyInfo(true)
    try {
      const response = await axios.get(`${domain}/sgservice/safety/statusSummary/?lockdownId=216d53f1-3b63-4e06-b440-36248b5b6964`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
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
                    <h4>{emergency.report}<ChevronRightIcon /></h4>
                    <h5 className="author">
                      <label>Andrew Hoggard,</label>&nbsp;<span>Jun 5, 2020,</span>
                      &nbsp;<span>08:50 AM</span>
                    </h5>
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
                          <h4>Intruder <ChevronRightIcon /></h4>
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
                </Grid>
              </div>
            </div>
            <div className="section-column">
              <h3>Closed Emergency</h3>
              <div className="close-eme-container">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }} className="pro-eme">
                      <CardContent>
                        <div className="pro-eme-single" onClick={getLockDownInfo}>
                          <h4>Intruder <ChevronRightIcon /></h4>
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
                  <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }} className="pro-eme">
                      <CardContent>
                        <div className="pro-eme-single">
                          <h4>Intruder <ChevronRightIcon /></h4>
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
                  <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }} className="pro-eme">
                      <CardContent>
                        <div className="pro-eme-single">
                          <h4>Intruder</h4>
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
                </Grid>
              </div>
            </div>
          </div>

        </div> : <Emergency></Emergency>
      }
    </>


  );
}

export default Dashboard;
