import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "./authenticator";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Authenticate() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const BASE_URL = "http://127.0.0.1:8000/hot";

  const logIn = async (authData) => {
    const response = await axios.post(`${BASE_URL}/login/`, { ...authData });
    if (response.status === 200) {
      navigate("/admindashboard");
      alert(response.data.message);
    } else {
      setError("Invalid username or password!");
    }
  };

  const loginForm = useFormik({
    initialValues: {
      username: "",
      pw: "",
    },

    onSubmit: (values) => {
      logIn(values);
    },
  });
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={5}
    >
      <Card sx={{ width: "50%" }}>
        <CardHeader title="Log in" />
        <CardContent>
          {error ? <Typography color="error">{error}</Typography> : null}
          <form onSubmit={loginForm.handleSubmit}>
            <Stack rowGap={2}>
              <TextField
                placeholder="Username"
                type="text"
                name="username"
                id="username"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              <TextField
                placeholder="Password"
                type="password"
                name="pw"
                id="pw"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              <Button fullWidth variant="contained" type="submit">
                Log In
              </Button>
            </Stack>
          </form>
          <Box display={"flex"} justifyContent={"end"} mt={2}>
            <Button variant="outlined">Create account</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
