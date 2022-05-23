import React from "react";
import "./messages.css";
import { useGlobalContext } from "../../context/context";
import { format } from "timeago.js";

const Messages = ({ msg, own }) => {
  const { conversationUserName, currentUser } = useGlobalContext();
  const PF = `http://localhost:5000/images/${conversationUserName.profilePhoto}`;
  const PF2 = `http://localhost:5000/images/${currentUser.profilePhoto}`;

  return (
    <div className="single-msg">
      <div className={own ? "msg-main" : ""}>
        <img
          src={
            own
              ? currentUser.profilePhoto.includes("https")
                ? currentUser.profilePhoto
                : PF2
              : conversationUserName.profilePhoto.includes("https")
              ? conversationUserName.profilePhoto
              : PF
          }
          alt="img"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginRight: "10px",
            marginLeft: "10px",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            background: "#EFEFEF",
            display: "inline-block",
            borderRadius: "6px",
            padding: "10px",
          }}
        >
          <span>{msg.text}</span>
        </div>
      </div>
      <p className={own ? "msg-time msg-time-own" : "msg-time"}>
        {format(msg.createdAt)}
      </p>
    </div>
  );
};

export default Messages;
