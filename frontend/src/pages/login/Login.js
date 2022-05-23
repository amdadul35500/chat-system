import React, { useState, useEffect } from "react";
import "./login.css";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Box, TextField } from "@mui/material";
import { useGlobalContext } from "../../context/context";
import axios from "axios";

const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useGlobalContext();

  // auth gard
  useEffect(() => {
    const coockie = async () => {
      try {
        const { data } = await axios.get("/coockie");
        if (data) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    coockie();
  }, []);

  // formik validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("/auth/signin", values);
        if (data) {
          setCurrentUser(data);
          navigate("/");
        }
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    },
  });

  // will be call when google login will be failuire
  const handleFailure = (result) => {
    console.log(result);
  };

  // google login information
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      const genderAndBirthday = await axios
        .get(
          `https://people.googleapis.com/v1/people/me?key=${"AIzaSyBepIBCwjWETT2a_4LNVUBcf596wemVTZk"}&personFields=birthdays,genders`,
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        )
        .then((res) => res.data);

      // user information from google login
      const googleUserInfo = {
        firstname: userInfo.given_name,
        lastname: userInfo.family_name,
        username: userInfo.name,
        email: userInfo.email,
        birthday: `${genderAndBirthday.birthdays[0].date.day}/${genderAndBirthday.birthdays[0].date.month}/${genderAndBirthday.birthdays[0].date.year}`,
        gender: genderAndBirthday.genders[0].value,
        profilePhoto: userInfo.picture,
      };

      try {
        const { data } = await axios.post("/auth/singup", googleUserInfo);
        const res = await axios.get("/auth/signin/google");
        setCurrentUser(data);
        navigate("/");
      } catch (error) {
        const response = await axios.get(
          `/auth/google/getLoginUser/${googleUserInfo.email}`
        );
        const res = await axios.get("/auth/signin/google");
        setCurrentUser(response.data);
        navigate("/");
        console.log(error);
      }
    },
    scope:
      "https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read",
  });

  return (
    <div className="singin-box">
      <h3 style={{ textAlign: "center", marginTop: "0px", color: "#626465" }}>
        Sign in
      </h3>
      <div className="signup-fild">
        <form onSubmit={formik.handleSubmit}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Email"
              id="fullWidth"
              size="small"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              label="Password"
              id="fullWidth"
              size="small"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Box>
          {emailError && (
            <p style={{ color: "red", marginBottom: "15px" }}>
              Email already exist!
            </p>
          )}

          <input
            type="submit"
            value="SIGN IN"
            style={{
              width: "100%",
              marginBottom: "15px",
              background: "#1565C0",
              border: "none",
              padding: "10px",
              color: "white",
              borderRadius: "3px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          />
        </form>
      </div>

      <div className="google-signin" style={{ textAlign: "center" }}>
        <GoogleLogin onSuccess={googleLogin} onError={handleFailure} />
      </div>
      <NavLink to="/signup">
        <h3
          style={{
            color: "#626465",
            fontWeight: "400",
            fontSize: "15px",
            textAlign: "center",
            cursor: "pointer",
            marginTop: "6px",
          }}
        >
          DON'T HAVE AN ACCOUNT? SIGN UP
        </h3>
      </NavLink>
    </div>
  );
};

export default Login;
