import React from "react";
import "./ManageEmergency.scss";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SendToMobileOutlinedIcon from "@mui/icons-material/SendToMobileOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function ManageEmergency() {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Andrew Hoggard", "786-247-1779", "Admin", 10, 4.0),
    createData("Ben Fernandez", "305-245-5467", "Fire", 37, 4.3),
    createData("Carlos Hinojosa", "786-836-1234", "Police", 24, 6.0),
    createData("David Miller", "305-247-1780", "Police", 67, 4.3),
    createData("Elsy Lopez", "305-125-8325", "Police", 49, 3.9),
  ];

  return (
    <div className="MainContainer manageusers">
      <header>
        <h2>Manage Emergency Contacts</h2>
      </header>
      <div className="content-section">
        <div className="section-column">
          <div className="action-content">
            <Box
              sx={{ minWidth: 200 }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">All Roles</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Admin</MenuItem>
                  <MenuItem value={20}>Fire</MenuItem>
                  <MenuItem value={30}>Police</MenuItem>
                </Select>
              </FormControl>

              <Stack spacing={2} className="search-box">
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      className="search-input"
                    />
                  )}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                {/* <Button
                  className="secondary-btn"
                  variant="contained"
                  startIcon={<FileDownloadOutlinedIcon />}
                >
                  Import
                </Button> */}
                <Button
                  className="primary-btn"
                  variant="contained"
                  startIcon={<AddOutlinedIcon />}
                >
                  Add Contact
                </Button>
              </Stack>
            </Box>
          </div>
          <div className="table-data">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          startIcon={<EditOutlinedIcon />}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          startIcon={<DeleteOutlinedIcon />}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEmergency;
