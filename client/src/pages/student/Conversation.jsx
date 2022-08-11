import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import EndPointContext from "../../context/EndPointContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import NavbarStudent from "../../components/NavbarStudent";

function Conversation() {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;
  const navigate = useNavigate();
  const [conversations, setConversations] = useState({});

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const headers = {
      Authorization: `${localStorage.getItem("studentToken")}`,
    };

    const helper = async () => {
      const res = await axios.get(ENDPOINT + "student/conversation", {
        headers: headers,
      });
      setConversations(res.data.conversations);
    };
    helper();
  }, [ENDPOINT]);

  return (
    <Fragment>
      <NavbarStudent />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Registration No.
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Explore
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {conversations.length &&
                  conversations.map((conversation) => (
                    <TableRow
                      key={conversation.roomId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {conversation.senderRegistrationNumber}
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          to={`/student/${conversation.senderRegistrationNumber}`}
                        >
                          Explore
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Conversation;
