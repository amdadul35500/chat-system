import React, { useState, useRef } from "react";
import Nabvar from "../../component/navbar/Nabvar";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./profile.css";
import { useGlobalContext } from "../../context/context";
import axios from "axios";

const Profile = () => {
  const { currentUser, setCurrentUser } = useGlobalContext();
  const [firstNameEdit, setFirstNameEdit] = useState(currentUser.firstname);
  const [middleNameEdit, setMiddleNameEdit] = useState(
    currentUser.middlename ? currentUser.middlename : ""
  );
  const [lastNameEdit, setLastNameEdit] = useState(currentUser.lastname);
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const PF = `http://localhost:5000/images/${currentUser.profilePhoto}`;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // update current user
  const handleUpdate = async () => {
    await axios.put(`/auth/update/${currentUser._id}`, {
      firstname: firstNameEdit,
      middlename: middleNameEdit,
      lastname: lastNameEdit,
    });
    const { data } = await axios.get(`/auth/${currentUser._id}`);
    setCurrentUser(data);
    handleClose();
  };

  // upload photo and change profile photo
  const handleChange = async () => {
    const file = inputRef.current.files["0"];
    try {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      await axios.post("/auth/upload", formData);
      await axios.put(`/auth/update/${currentUser._id}`, {
        profilePhoto: filename,
      });
      const { data } = await axios.get(`/auth/${currentUser._id}`);
      setCurrentUser(data);

      //const res= await axios.put("/auth/upload")
    } catch (error) {
      console.log(error);
    }
  };

  // clicked hide input fild
  const handleCLick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="profile">
        <Nabvar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="pro-collum"
        >
          <div>
            <img
              src={
                currentUser.profilePhoto.includes("https")
                  ? currentUser.profilePhoto
                  : currentUser.profilePhoto
                  ? PF
                  : "./noAvatar.png"
              }
              alt="img"
              onClick={handleCLick}
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                marginRight: "15px",
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ marginRight: "15px" }} className="cng-pro">
            <h4>{`${currentUser.firstname} ${
              currentUser.middlename === undefined ? "" : currentUser.middlename
            } ${currentUser.lastname}`}</h4>
            <p
              style={{ color: "#4AA7F8", fontWeight: "500", cursor: "pointer" }}
              onClick={handleCLick}
            >
              Change Profile Photo
            </p>
          </div>
          {/* hide input fild for photo uploaded */}
          <input
            type="file"
            name="file"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleChange}
          />
          <div>
            <Button
              variant="contained"
              onClick={handleOpen}
              style={{ fontSize: "12px" }}
            >
              Edit Profile
            </Button>
          </div>
        </div>
        <div
          className="container "
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="profile-container">
            <div className="profile-row" style={{ marginTop: "20px" }}>
              <h4>First Name :</h4>
              <div className="fild">
                <h5>{currentUser.firstname}</h5>
              </div>
            </div>
            <div className="profile-row">
              <h4>Middle Name :</h4>
              <div className="fild">
                <h5>{currentUser.middlename}</h5>
              </div>
            </div>
            <div className="profile-row">
              <h4>Last Name :</h4>
              <div className="fild">
                <h5>{currentUser.lastname}</h5>
              </div>
            </div>
            <div className="profile-row">
              <h4>Userame :</h4>
              <div className="fild">
                <h5> {currentUser.username}</h5>
              </div>
            </div>
            <div className="profile-row">
              <h4>Email :</h4>
              <div className="fild">
                <h5> {currentUser.email}</h5>
              </div>
            </div>
            <div className="profile-row">
              <h4>Birthday :</h4>
              <div className="fild">
                <h5>{currentUser.birthday}</h5>
              </div>
            </div>
            <div className="profile-row">
              <h4>Gender :</h4>
              <div className="fild">
                <h5> {currentUser.gender}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div className="main-modal">
                <div className="flex-modal">
                  <h4>First Name :</h4>
                  <input
                    type="text"
                    value={firstNameEdit}
                    onChange={(e) => setFirstNameEdit(e.target.value)}
                  />
                </div>
                <div className="flex-modal">
                  <h4>Middle Name :</h4>
                  <input
                    type="text"
                    value={middleNameEdit}
                    onChange={(e) => setMiddleNameEdit(e.target.value)}
                  />
                </div>
                <div className="flex-modal">
                  <h4>Last Name :</h4>
                  <input
                    type="text"
                    value={lastNameEdit}
                    onChange={(e) => setLastNameEdit(e.target.value)}
                  />
                </div>
                <Button
                  variant="contained"
                  style={{ fontSize: "12px" }}
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
