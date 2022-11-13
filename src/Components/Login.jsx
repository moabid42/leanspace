import Auth from "@aws-amplify/auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import React, { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: "40%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();
    const { login } = useContext(UserContext);
    const [hasLoginError, setLoginError] = useState(false);

    const attemptLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            setLoginError(false);
            const username = formData.get("username");
            const password = formData.get("password");

            const user = await Auth.signIn(username, password);
            const {
                accessToken: { jwtToken },
            } = user.signInUserSession;

            login(jwtToken);
        } catch (err) {
            setLoginError(true);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Snackbar
                    open={hasLoginError}
                    autoHideDuration={6000}
                    onClose={() => setLoginError(false)}
                >
                    <Alert elevation={6} variant="filled" severity="error">
                        Wrong login or password.
                    </Alert>
                </Snackbar>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={attemptLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="User name"
                        name="username"
                        autoComplete="user"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
