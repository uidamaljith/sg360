import React from "react";
import "./Emergency.scss";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { Grid } from "@mui/material";

function Emergency({ staffdeatils, details, sendDataToParent }) {
  return (
    <div className="MainContainer emergency">
      <header>
        <h2>Emergency</h2>
      </header>

      <div className="content-section">
        <div className="section-column">
          <button onClick={() => { sendDataToParent(); }}>Back</button>
          <div className="close-eme-container">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} className="pro-eme">
                  <CardContent>
                    <div className="pro-eme-single">
                      <h4>{details.incidentType}</h4>
                      <h5 className="author">
                        <LocationOnOutlinedIcon sx={{ fontSize: 24 }} />
                        <label>{details.incidentLoc == null ? 'No location info' : details.incidentLoc}</label>
                      </h5>
                      <h5 className="author">
                        <AccessTimeIcon sx={{ fontSize: 24 }} />
                        <span>Jun 5, 2020,</span>&nbsp;<span>08:50 AM</span>
                      </h5>
                      <h5 className="author">
                        <PendingOutlinedIcon sx={{ fontSize: 24 }} />
                        <span>In Progress</span>
                      </h5>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div className="staff-stats">
            <h4>Staff</h4>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} className="pro-eme">
                  <CardContent>
                    <div className="staff-progres-box">
                      <ul className="staff-progress">
                        <li style={{ width: "40%" }} className="green"></li>
                        <li style={{ width: "30%" }} className="red"></li>
                        <li style={{ width: "30%" }} className="nutral"></li>
                      </ul>
                      <div className="stats-count">
                        <h5 className="green">
                          <span>2</span>Safe
                        </h5>
                        <h5 className="red">
                          <span>1</span>Need Help
                        </h5>
                        <h5 className="nutral">
                          <span>0</span>Unknown
                        </h5>
                      </div>
                    </div>
                    <div className="staff-stats-box"></div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div className="staff-table">

            <ul>
              <li className="name">Andrew Hoggard</li>
              <li className="safe">Safe (On Campus)</li>
              <li className="">Safe (Off Campus)</li>
              <li className="">Need Help</li>
            </ul>
            <ul>
              <li className="name">Andrew Hoggard</li>
              <li className="">Safe (On Campus)</li>
              <li className="safe">Safe (Off Campus)</li>
              <li className="">Need Help</li>
            </ul>
            <ul>
              <li className="name">Andrew Hoggard</li>
              <li className="">Safe (On Campus)</li>
              <li className="">Safe (Off Campus)</li>
              <li className="nh">Need Help</li>
            </ul>

          </div>
        </div>
        {/* <div className="chat-container">
          <Card sx={{ minWidth: 275 }} className="chat-box">
            <CardContent>
              <h3>Chat Bot</h3>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}

export default Emergency;
