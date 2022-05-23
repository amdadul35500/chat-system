import React from "react";
import "./nabvar.css";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AddReactionSharpIcon from "@mui/icons-material/AddReactionSharp";
import { useGlobalContext } from "../../context/context";
import axios from "axios";

const Nabvar = () => {
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();
  const PF = `http://localhost:5000/images/${currentUser.profilePhoto}`;

  const logoutHandle = async () => {
    await axios.get("auth/signout");
    navigate("/signin");
  };

  return (
    <div className="container-fluid" style={{ marginBottom: "25px" }}>
      <div className="row nav-row">
        <div
          className="col-6 nav-first-col-6"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <NavLink to="/" style={{ display: "inline-flex" }}>
            <img
              src="./react-favicon.png"
              alt="img"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginLeft: "105px",
                marginRight: "8px",
              }}
            />
            <h4 style={{ color: "#8B758B", textDecoration: "none" }}>
              Chat System
            </h4>
          </NavLink>
        </div>
        <div
          className="col-md-6 col-12 nav-second-col-6"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <NavLink to="/">
            <svg
              aria-label="Home"
              className="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="33"
              role="img"
              viewBox="0 0 24 24"
              width="33"
              style={{ marginRight: "30px" }}
            >
              <path
                d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </NavLink>
          <LogoutIcon
            style={{
              marginRight: "30px",
              cursor: "pointer",
              fontSize: "36px",
            }}
            onClick={logoutHandle}
          />
          <NavLink to="/addUsers">
            <AddReactionSharpIcon
              style={{
                marginRight: "30px",
                fontSize: "40px",
                color: "black",
              }}
            />
          </NavLink>
          <NavLink to="/profile">
            <img
              src={
                Object.entries(currentUser).length === 0
                  ? "./noAvatar.png"
                  : currentUser.profilePhoto.includes("https")
                  ? currentUser.profilePhoto
                  : currentUser.profilePhoto
                  ? PF
                  : "./noAvatar.png"
              }
              alt="img"
              className="profile-logo"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nabvar;
