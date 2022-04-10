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

function UpdatePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Fragment>
      <Grid container justifyContent="center" alignContent="center">
        <Grid item xs={12} md={4}>
          <Container>
            <Card>
              <form onSubmit={submitHandler}>
                <Typography sx={{ m: 2 }} variant="h4">
                  Update Password
                </Typography>

                <FormControl fullWidth sx={{ m: 2 }}>
                  <TextField
                    id="password"
                    label="Old Password"
                    type="password"
                    variant="outlined"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 2 }}>
                  <TextField
                    id="password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 2 }}>
                  <TextField
                    id="password"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={cnfPassword}
                    onChange={(e) => setCnfPassword(e.target.value)}
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

export default UpdatePassword;
