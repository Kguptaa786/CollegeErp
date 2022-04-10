import React, { Fragment, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  Card,
} from "@mui/material";

function AdminLogin(props) {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(regNumber);
  };
  return (
    <Fragment>
      <Grid container justifyContent="center" alignContent="center">
        <Grid item xs={12} md={4}>
          <Container>
            <Card>
              <form onSubmit={submitHandler}>
                <Typography sx={{ m: 2 }} variant="h4">
                  Admin Login
                </Typography>
                <FormControl fullWidth sx={{ m: 2 }}>
                  <TextField
                    id="regNumber"
                    label="Registration Number"
                    variant="outlined"
                    value={regNumber}
                    onChange={(e) => {
                      setRegNumber(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 2 }}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                <Button sx={{ m: 2 }} variant="contained" type="submit">
                  Log In
                </Button>
              </form>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default AdminLogin;
