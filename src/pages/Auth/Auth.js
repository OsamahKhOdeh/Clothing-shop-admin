import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Icon from "./icon";
//import { signin, signup } from "../../actions/auth";
//import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";
import { login } from "../../redux/apiCalls";
import { clearError } from "../../redux/userRedux";

const initialState = { firstName: "", lastName: "", username: "", password: "", confirmPassword: "" };

const SignUp = () => {
  const [showNotAdmin, setshowNotAdmin] = useState(false);
  let admin = null;
  const user = useSelector((state) => state.user?.currentUser);
  if (user) {
    admin = user.isAdmin;
  }
  const { isFetching, error } = useSelector((state) => state.user);
  console.log(isFetching);

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (isSignup) {
      //dispatch(signup(form, history));
    } else {
      let username = form.username;
      let password = form.password;
      login(dispatch, { username, password });
      setshowNotAdmin(true);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setshowNotAdmin(false);
  };

  if (admin) {
    history.push("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="username" label="Username" handleChange={handleChange} />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" disabled={isFetching} color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
        {error && (
          <Typography color="secondary" component="h1" variant="h5">
            the username or password is incorrect !
          </Typography>
        )}
        {!admin && showNotAdmin && !error && !isFetching && (
          <Typography color="secondary" component="h1" variant="h5">
            This user is not an admin
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SignUp;
