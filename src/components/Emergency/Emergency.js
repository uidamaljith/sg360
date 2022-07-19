import React from "react";
import "./Emergency.scss";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';

function Emergency({ staffdeatils, details, staffSafetyList, sendDataToParent }) {
  return (
    <div className="MainContainer emergency">
      <header>
        <Button className="back-button" variant="outlined" onClick={() => { sendDataToParent(); }}><ArrowBackIosNewIcon style={{ color: '#fff' }} /></Button>
        <h2>Emergency</h2>
      </header>

      <div className="content-section">
        <div className="section-column">
          
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
                        <span>{details.approvedTime ? details.approvedTime : ' No data'}</span>
                      </h5>
                      <h5 className="author">
                        <PendingOutlinedIcon sx={{ fontSize: 24 }} />
                        <span>{details.lockdownActive ? 'In Progress' : 'Closed'}</span>
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
                        <li style={{ width: toString((staffdeatils.totalCount / staffdeatils.safeCount) * 100) }} className="green"></li>
                        <li style={{ width: toString((staffdeatils.totalCount / staffdeatils.unSafeCount) * 100) }} className="red"></li>
                        <li style={{ width: toString((staffdeatils.totalCount / (staffdeatils.totalCount - (staffdeatils.safeCount + staffdeatils.unSafeCount))) * 100) }} className="nutral"></li>
                      </ul>
                      <div className="stats-count">
                        <h5 className="green">
                          <span>{staffdeatils.totalCount}</span>Total
                        </h5>
                        <h5 className="green">
                          <span>{staffdeatils.safeCount}</span>Safe
                        </h5>
                        <h5 className="red">
                          <span>{staffdeatils.unSafeCount}</span>Need Help
                        </h5>
                        <h5 className="nutral">
                          <span>{staffdeatils.totalCount}</span>Unknown
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
            {staffSafetyList ? (<ul>
              <li className="name">Andrew Hoggard</li>
              <li className="safe">Safe (On Campus)</li>
              <li className="">Safe (Off Campus)</li>
              <li className="">Need Help</li>
            </ul>) : <div className="nodata"><h3>No data found</h3></div>}

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
