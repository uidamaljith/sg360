import React from "react";
import "./Dashboard.scss";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid } from "@mui/material";
import { grey } from "@mui/material/colors";


function Dashboard() {
  return (
    <div className="MainContainer dashboard">
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
                <h4>There's gun in the gym. It's in a blue bag. Need help.<ChevronRightIcon/></h4>
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
                      <h4>Intruder <ChevronRightIcon/></h4>
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
                    <div className="pro-eme-single">
                      <h4>Intruder <ChevronRightIcon/></h4>
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
                      <h4>Intruder <ChevronRightIcon/></h4>
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
    </div>
  );
}

export default Dashboard;
