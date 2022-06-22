import React, { useState, useEffect, useContext } from "react";
import EndPointContext from "../../context/EndPointContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import NavbarStudent from "../../components/NavbarStudent";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "./ChatPage.css";
import Message from "./ChatPageHelper/Message";

let socket;
const endpoint = "http://localhost:4000";
//Swap HelperFunction
function swap(input, value_1, value_2) {
  var temp = input[value_1];
  input[value_1] = input[value_2];
  input[value_2] = temp;
}
function ChatPage() {
  const ENDPOINT = useContext(EndPointContext).ENDPOINT;

  const navigate = useNavigate();
  const params = useParams();
  const [room1, setRoom1] = useState("");
  const [room2, setRoom2] = useState("");
  const [receiverRegistrationNumber, setReceiverRegistrationNumber] =
    useState("");
  const [receiverName, setReceiverName] = useState("");
  const [student, setStudent] = useState({});
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [olderMessages, setOlderMessages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
    setStudent(jwt_decode(localStorage.getItem("studentToken")));
  }, [navigate]);

  //setting room variable
  useEffect(() => {
    let temp = params.roomId;
    socket = io(endpoint);
    let tempArr = temp.split("_");
    setReceiverRegistrationNumber(tempArr[0]);
    setRoom1(temp);
    swap(tempArr, 0, 1);
    let tempRoom2 = tempArr[0] + "_" + tempArr[1];
    setRoom2(tempRoom2);
  }, [params.roomId]);

  useEffect(() => {
    let temp = params.roomId;
    let tempArr = temp.split("_");
    axios
      .get(ENDPOINT + `student/${tempArr[0]}`)
      .then((res) => {
        setReceiverName(res.data.student.name);
      })
      .catch((err) => console.log(err));
  }, [params.roomId, ENDPOINT]);
  //setting socket endpoint
  useEffect(() => {
    socket = io(endpoint);
    socket.emit("join room", {
      room1,
      room2,
    });
    socket.on("new Message", (data) => {
      console.log(data);
      setMessageArray([...messageArray, data]);
    });
    return () => {
      socket && socket.disconnect();
      // socket.emit("disconnect");
      // socket.off();
    };
  }, [room1, room2, messageArray]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/student/chat/${room1}`)
  //     .then((res) => {
  //       setOlderMessages(res.data.result);
  //     })
  //     .catch((e) => console.log(e));
  //   axios
  //     .get(`http://localhost:4000/student/chat/${room2}`)
  //     .then((res) => {
  //       setOlderMessages([...olderMessages, res.data.result]);
  //     })
  //     .catch((e) => console.log(e));
  // }, [olderMessages, room1, room2]);

  const formHandler = async (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      socket.emit("private message", {
        senderName: student.name,
        message,
        room: room1,
        receiverName: receiverName,
      });
      setMessage("");

      //axios post sendmessage
      await axios
        .post(`${ENDPOINT}student/chat/${room1}`, {
          roomId: room1,
          senderName: student.name,
          senderId: student.id,
          message,
          senderRegistrationNumber: student.registrationNumber,
          receiverRegistrationNumber,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } else {
      window.alert("Can't send empty message");
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/student/chat/${room1}`)
  //     .then((res) => {
  //       setOlderMessages(res.data.result);
  //     })
  //     .catch((e) => console.log(e.message));
  // }, [room1]);

  useEffect(() => {
    axios.get(`${ENDPOINT}student/chat/${room1}`).then((res) => {
      setOlderMessages(res.data.result);
    });
    socket.on("new Message", (data) => {
      setMessageArray([...messageArray, data]);
    });
  }, [messageArray, room1, ENDPOINT]);

  return (
    <>
      <Grid container direction="column" justifyContent="space-between">
        <Box>
          <NavbarStudent />
        </Box>

        <div className="chatPage">
          <div className="chatContainer">
            <div className="header">
              <h2>Let's Chat</h2>
            </div>
            <ReactScrollToBottom className="chatBox">
              {olderMessages !== undefined &&
                olderMessages.map((payload, index) =>
                  payload.senderName === student.name ? (
                    <Message
                      recieverName=""
                      key={index}
                      message={payload.message}
                      classs="right"
                    />
                  ) : (
                    <Message
                      recieverName={payload.senderName}
                      key={index}
                      message={payload.message}
                      classs="left"
                    />
                  )
                )}
              {/* {messageArray.map((payload, index) =>
                payload.senderName !== student.name ? (
                  <Message
                    recieverName=""
                    key={index}
                    message={payload.message}
                    classs="right"
                  />
                ) : (
                  <Message
                    recieverName={payload.receiverName}
                    key={index}
                    message={payload.message}
                    classs="left"
                  />
                )
              )} */}
            </ReactScrollToBottom>
            <form onSubmit={formHandler}>
              <div className="inputBox">
                <input
                  className="styleInput"
                  type="text"
                  name="chat"
                  value={message}
                  placeholder="Send text.."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="sendBtn">Send</button>
              </div>
            </form>
          </div>
        </div>
      </Grid>
    </>
  );
}

export default ChatPage;
