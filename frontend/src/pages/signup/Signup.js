import React, { useState, useEffect } from "react";
import "./signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

const Signup = () => {
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

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
      firstname: "",
      middlename: "",
      lastname: "",
      username: "",
      birthday: "",
      email: "",
      password: "",
      gender: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(20, "First name must be less than or equal to 20 characters")
        .min(2, "First name must be more than or equal to 2 characters")
        .required("This is required field"),
      middlename: Yup.string()
        .max(20, "Middle name must be less than or equal to 20 characters")
        .min(2, "Middle name must be more than or equal to 2 characters"),
      lastname: Yup.string()
        .max(20, "Last name must be less than or equal to 20 characters")
        .min(2, "Last name must be more than or equal to 2 characters")
        .required("This is required field"),
      username: Yup.string()
        .min(2, "Last name must be more than or equal to 2 characters")
        .required("This is required field"),
      birthday: Yup.string().required("This is required field"),
      password: Yup.string()
        .min(6, "Password must be more than or equal to 6 characters")
        .required("This is required field"),
      email: Yup.string()
        .email("Please provide valid email")
        .required("This is required field"),
      gender: Yup.string().required("This is required field"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("/auth/singup", values);
        setEmailError(false);
        navigate("/signin");
      } catch (error) {
        setEmailError(true);
        console.log(error);
      }
    },
  });

  return (
    <div
      className={
        Object.entries(formik.errors).length >= 1
          ? "signup-center signup-big"
          : "signup-center"
      }
    >
      <div className="singup-box">
        <h3 style={{ textAlign: "center", marginTop: "0px", color: "#626465" }}>
          Sign up
        </h3>
        <div className="signup-fild">
          <form onSubmit={formik.handleSubmit}>
            <Box component="form" noValidate autoComplete="off">
              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: "48%",
                    marginRight: "3%",
                  }}
                >
                  <TextField
                    required
                    label="First Name"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                  />

                  {formik.touched.firstname && formik.errors.firstname && (
                    <p style={{ color: "red" }}> {formik.errors.firstname}</p>
                  )}
                </div>

                <div
                  style={{
                    display: "inline-block",
                    width: "48%",
                  }}
                >
                  <TextField
                    required
                    label="Middle Name"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    name="middlename"
                    value={formik.values.middlename}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                  />
                  {formik.touched.middlename && formik.errors.middlename && (
                    <p style={{ color: "red" }}> {formik.errors.middlename}</p>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: "48%",
                    marginRight: "3%",
                  }}
                >
                  <TextField
                    required
                    label="Last Name"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <p style={{ color: "red" }}> {formik.errors.lastname}</p>
                  )}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    width: "48%",
                  }}
                >
                  <TextField
                    required
                    label="Username"
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p style={{ color: "red" }}> {formik.errors.username}</p>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: "48%",
                    marginRight: "3%",
                  }}
                >
                  <TextField
                    id="date"
                    label="Birthday"
                    size="small"
                    type="date"
                    name="birthday"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {formik.touched.birthday && formik.errors.birthday && (
                    <p style={{ color: "red" }}> {formik.errors.birthday}</p>
                  )}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    width: "48%",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Password"
                    id="fullWidth"
                    size="small"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p style={{ color: "red" }}> {formik.errors.password}</p>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <TextField
                  fullWidth
                  label="Email"
                  id="fullWidth"
                  size="small"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p style={{ color: "red" }}>{formik.errors.email}</p>
                )}
                {emailError && (
                  <p style={{ color: "red" }}>Email already exist!</p>
                )}
              </div>

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    name="gender"
                    onChange={formik.handleChange}
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    name="gender"
                    onChange={formik.handleChange}
                  />
                  {formik.touched.gender && formik.errors.gender && (
                    <p style={{ color: "red" }}> {formik.errors.gender}</p>
                  )}
                </RadioGroup>
              </FormControl>
            </Box>
            <input
              type="submit"
              value="SIGN UP"
              style={{
                width: "100%",
                marginBottom: "15px",
                background: "#1565C0",
                border: "none",
                padding: "10px",
                color: "white",
                borderRadius: "3px",
                marginTop: "15px",
                cursor: "pointer",
              }}
            />
          </form>
        </div>

        <NavLink to="/signin">
          <h3
            style={{
              color: "#626465",
              fontWeight: "400",
              fontSize: "15px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            ALREADY HAVE AN ACCOUNT? SIGN IN
          </h3>
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;
