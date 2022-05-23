import React, { useState, useEffect } from "react";
import "./conversation.css";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Conversation = ({ singleConversation }) => {
  const [singleUser, setSingleUser] = useState({});
  const {
    currentUser,
    setSingleUsermessages,
    setConversationUserName,
    SetSelectdConversation,
  } = useGlobalContext();
  const PF = `http://localhost:5000/images/${singleUser.profilePhoto}`;

  // get user info of single conversation
  useEffect(() => {
    const findUser = singleConversation.members.filter(
      (user) => currentUser._id !== user
    );
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/auth/${findUser[0]}`);
        setSingleUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [singleConversation.members, currentUser._id]);

  // get messages of selected conversation
  const handleMessage = async () => {
    try {
      const { data } = await axios.get(
        `conversation/find/${currentUser._id}/${singleUser._id}`
      );
      const res = await axios.get(`/message/${data._id}`);
      setSingleUsermessages(res.data);
      setConversationUserName(singleUser);
      SetSelectdConversation(singleConversation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conversation" onClick={handleMessage}>
      <div>
        <img
          src={
            Object.entries(singleUser).length === 0
              ? "./noAvatar.png"
              : singleUser.profilePhoto.includes("https")
              ? singleUser.profilePhoto
              : singleUser.profilePhoto
              ? PF
              : "./noAvatar.png"
          }
          alt="img"
          className="conv-img"
        />
      </div>
      <div className="conv-circle">
        {Object.entries(singleUser).length === 0 ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          `${singleUser.firstname} ${singleUser.middlename} ${singleUser.lastname}`
        )}
      </div>
    </div>
  );
};

export default Conversation;
