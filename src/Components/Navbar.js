// create a navbar component that will have name of the tenant  and a logout button

import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { UserContext } from "../Contexts/UserContext";

export default function Navbar() {
    const { user } = useContext(UserContext);
    const logout = async () => {
        await Auth.signOut();
    };
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user?.tenantName}
            </Typography>
            <Button color="inherit" onClick={logout}>
            Logout
            </Button>
        </Toolbar>
        </AppBar>
    );
}

