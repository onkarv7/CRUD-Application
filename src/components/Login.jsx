import React, { useState } from "react";
import { Grid, Avatar, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleName = (e) => {
    setUser((form) => ({
      ...form,
      userName: e.target.value,
    }));
  };

  const handlePassword = (e) => {
    setUser((form) => ({
      ...form,
      password: e.target.value,
    }));
  };

  const handleSubmit = (user) => {
    if (validate(user)) {
      navigate("/home");
      toast.success(`${user.userName} Logged In Successfully`)
    }
   
  };

  const validate = (user) => {
    if (user.userName == "") {
      toast("username is required field");
      return false;
    }

    if (user.userName < 5) {
      toast("username should have atleast 5 character");
      return false;
    }

    if (user.password < 5) {
      toast("username should have atleast 5 character");
      return false;
    }

    if (user.password == "") {
      toast("password is required field");
      return false;
    }
    return true;
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Box height="100vh" width="100vw">
      <Grid>
        <Box
          classname="login_container"
          elevation={10}
          padding=" 20px"
          height="70vh"
          maxWidth="580px"
          marginTop="50px"
          marginLeft="30%"
        >
          <Grid align="center">
            <Avatar sx={{ mb: "20px" }} style={avatarStyle}></Avatar>
            <h2> Log In</h2>
          </Grid>
          <TextField
            sx={{ mb: "40px", mt: "15px" }}
            label="Username"
            placeholder="Enter username"
            variant="outlined"
            fullWidth
            value={user.userName}
            onChange={handleName}
          />

          <TextField
            sx={{ mb: "40px" }}
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            value={user.password}
            onChange={handlePassword}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={() => handleSubmit(user)}
          >
            Log In
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Login;
