import React from "react";
import "./Message.css";

const Message = ({ recieverName, message, classs }) => {
  if (classs === "left") {
    return (
      <div
        className={`messageBox ${classs}`}
      >{`${recieverName}: ${message}`}</div>
    );
  } else {
    return <div className={`messageBox ${classs}`}>{`You: ${message}`}</div>;
  }
};

export default Message;
