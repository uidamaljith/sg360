import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from '../Auth'
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import SignInBg from "../../assets/bgimage.jpg";
import logo from "../../assets/sg360@2x.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.schoolguard360.com/">
        www.schoolguard360.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide({sendDataToParent}) {
  const axios = require('axios').default;
  const [schoolCode, setSchoolCode] = useState('')
  const auth = useAuth();

  const navigate = useNavigate();
  localStorage.setItem("domain", "https://prod.schoolguard360.com")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search) // id=123
    let code = params.get('schoolCode');
    setSchoolCode(code);
    if (localStorage.token) {
      navigate("/dashboard", { replace: true });
    }
    //setCompanyCode(code);
    //localStorage.removeItem("token");
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      schoolCode: data.get("companyCode"),
    });
    const loginObj = {
      userName: data.get("user"),
      password: data.get("password"),
      schoolCode: data.get("companyCode"),
    }
    localStorage.removeItem("domain");
    localStorage.removeItem("token");
    getAuth(loginObj);
  };

  async function getAuth(loginObj) {
    try {
      const response = await axios.get(`https://prod.schoolguard360.com/sgpublicservice/public/${loginObj.schoolCode}/preload`);
      const domainName = ( response.data.data  && response.data.data.Domain) ? response.data.data.Domain : 'prod.schoolguard360.com';
      localStorage.setItem("schoolCode", loginObj.schoolCode);
      login(loginObj,domainName);
    } catch (error) {
      console.error(error);
    }
  }
  async function login(loginObj,domainname) {
    try {
      const response = await axios.post(`https://${domainname}/sgservice/public/login/+1${loginObj.userName}`, {
        password: loginObj.password,
      }, {
        headers: {
          'schoolCode': loginObj.schoolCode
        }
      });
      localStorage.setItem("domain", domainname);
      localStorage.setItem("token", response.headers.token);
      auth.login(loginObj.userName);
      sendDataToParent();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${SignInBg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="logincontainer">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 className="logo-login"><img src={logo} alt="" /></h1>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="User ID"
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="companyCode"
                label="Company Code"
                value={schoolCode}
                id="companyCode"
                autoComplete="companyCode"
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
