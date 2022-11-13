//create a sidebar component that will have a list of links to the different pages

import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <List component="nav">
            <ListItem component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to="/profile">
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem component={Link} to="/settings">
                <ListItemText primary="Settings" />
            </ListItem>
        </List>
    );
}