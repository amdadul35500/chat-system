import React from "react";
import "./addSingleUsers.css";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSingleUsers = ({ singleUser }) => {
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();
  const PF = `http://localhost:5000/images/${singleUser.profilePhoto}`;

  // add conversation function
  const handleClick = async () => {
    const objectInfo = {
      senderId: currentUser._id,
      receiverId: singleUser._id,
    };
    try {
      const { data } = await axios.post("/conversation", objectInfo);
      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  return (
    <div className="singleUser" onClick={handleClick}>
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
        className="singleUser-conv"
      />
      <span>{`${singleUser.firstname} ${singleUser.middlename} ${singleUser.lastname}`}</span>
    </div>
  );
};

export default AddSingleUsers;
