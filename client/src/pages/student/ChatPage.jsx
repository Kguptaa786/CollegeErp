import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import NavbarStudent from "../../components/NavbarStudent";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "./ChatPage.css";
import Message from "./ChatPageHelper/Message";

const ENDPOINT = "http://localhost:4000";
let socket;
function ChatPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [room1, setRoom1] = useState("");
  const [room2, setRoom2] = useState("");
  const [receiverRegistrationNumber, setReceiverRegistrationNumber] =
    useState("");
  const [senderRegistrationNumber, setSenderRegistrationNumber] =
    useState("second");
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [olderMessages, setOlderMessages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("studentToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    let temp = params.room;
    socket = io(ENDPOINT);
    let tempArr = temp.split("_");
    setSenderRegistrationNumber(tempArr[0]);
    setReceiverRegistrationNumber(tempArr[1]);
    setRoom1(temp);
    let tempRoom2 = tempArr[1] + "_" + tempArr[0];
    setRoom2(tempRoom2);
  }, [params.room]);

  useEffect(() => {
    // dispatch(getPrivateConversation(room1));
    // dispatch(getPrivateConversation2(room2));
    socket = io(ENDPOINT);
    socket.emit("join room", {
      room1,
      room2,
    });
    socket.on("new Message", (data) => {
      setMessageArray([...messageArray, data]);
    });
    // return () => {
    //   window.alert("sdabfkaj");
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, [room1, room2, messageArray]);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/student/students/getOlderMessage", {
  //       receiverRegistrationNumber,
  //       senderRegistrationNumber,
  //     })
  //     .then((res) => {
  //       setOlderMessages(res.data.olderMessages);
  //     })
  //     .catch((e) => console.log(e));
  // });

  useEffect(() => {
    axios.get("http://localhost:4000/getMsg").then((res) => {
      setOlderMessages(res.data.msg).catch((e) => console.log(e));
    });
  }, []);

  const formHandler = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      socket.emit("private message", {
        sender: "john",
        message,
        room: room1,
      });
      setMessage("");
      // let messageObj = {
      //   roomId: room1,
      //   senderName: store.student.student.student.name,
      //   senderId: store.student.student.student._id,
      //   message,
      //   senderRegistrationNumber:
      //     store.student.student.student.registrationNumber,
      //   receiverRegistrationNumber,
      // };
      // dispatch(sendMessage(room1, messageObj));
    } else {
      window.alert("Can't send empty message");
    }
  };

  // useEffect(() => {
  //   socket.on("new Message", (data) => {
  //     setOlderMessages(store.student.privateChat);
  //     setMessageArray([...messageArray, data]);
  //   });
  // }, [messageArray, olderMessages]);

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
              {messageArray.map((payload, index) => (
                <Message
                  user="kk"
                  key={index}
                  message={payload.message}
                  classs="right"
                />
              ))}
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
        {/* <Box>
          <h3>Chat begin</h3>
          {olderMessages.length &&
            olderMessages.map((msg, index) => {
              return <p key={index}>{msg.message}</p>;
            })}
          {messageArray.map((payload, index) => {
            return <p key={index}>{payload.message}</p>;
          })}
        </Box> */}
      </Grid>
    </>
  );
}

export default ChatPage;
