import React, { Fragment, useState } from "react";
import {
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function MarkAttendance() {
  const [studentDepartment, setStudentDepartment] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [studentSection, setStudentSection] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Fragment>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={submitHandler}>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Department"
                value={studentDepartment}
                onChange={(e) => {
                  setStudentDepartment(e.target.value);
                }}
              >
                <MenuItem value="CE">CIVIL ENGINEERING</MenuItem>
                <MenuItem value="CSE">COMPUTER SCIENCE & ENGINEERING</MenuItem>
                <MenuItem value="EE">ELECTRICAL ENGINEERING</MenuItem>
                <MenuItem value="ECE">
                  ELECTRONICS & COMMUNICATION ENGINEERING
                </MenuItem>
                <MenuItem value="ME">MECHANICAL ENGINEERING</MenuItem>
                <MenuItem value="MME">
                  MATERIALS & METALLURGICAL ENGINEERING
                </MenuItem>
                <MenuItem value="CHEM">CHEMICAL ENGINEERING</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Year"
                value={studentYear}
                onChange={(e) => {
                  setStudentYear(e.target.value);
                }}
              >
                <MenuItem value="first">1st</MenuItem>
                <MenuItem value="second">2nd</MenuItem>
                <MenuItem value="third">3rd</MenuItem>
                <MenuItem value="fourth">4th</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Section"
                value={studentSection}
                onChange={(e) => {
                  setStudentSection(e.target.value);
                }}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ m: 2 }}
              variant="contained"
              color="success"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={8}>
          <form>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Subject Code
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Department"
                value={studentDepartment}
                onChange={(e) => {
                  setStudentDepartment(e.target.value);
                }}
              >
                <MenuItem value="CE">301</MenuItem>
                <MenuItem value="CSE">302</MenuItem>
                <MenuItem value="EE">302</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="demo-simple-select-label">Exam</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Department"
                value={studentDepartment}
                onChange={(e) => {
                  setStudentDepartment(e.target.value);
                }}
              >
                <MenuItem value="CE">301</MenuItem>
                <MenuItem value="CSE">302</MenuItem>
                <MenuItem value="EE">302</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                id="standard-basic"
                label="Total Mark"
                variant="standard"
              />
            </FormControl>
            <Button
              sx={{ m: 2 }}
              variant="contained"
              color="success"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={8}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default MarkAttendance;
