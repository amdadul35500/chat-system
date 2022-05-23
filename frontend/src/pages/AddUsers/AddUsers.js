import React, { useState, useEffect } from "react";
import "./addUsers.css";
import Nabvar from "../../component/navbar/Nabvar";
import AddSingleUsers from "../../component/addUsers/AddSingleUsers";
import axios from "axios";

const AddUsers = () => {
  const [allUser, setAllUser] = useState([]);

  // get all user
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const { data } = await axios.get("/auth");
        setAllUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUser();
  }, []);

  return (
    <>
      <div
        className="addUsers"
        style={{ background: "#FAFAFA", width: "100vw", height: "100vh" }}
      >
        <Nabvar />
        <div className="container">
          <div className="row addUsers-row">
            <h3
              style={{
                textAlign: "center",
                color: "#a8a8a8",
              }}
            >
              Add New Conversation
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <div
                className="allUsers"
                style={{ width: "30%", height: "65vh" }}
              >
                {allUser.map((singleUser) => (
                  <div key={singleUser._id}>
                    <AddSingleUsers singleUser={singleUser} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUsers;
