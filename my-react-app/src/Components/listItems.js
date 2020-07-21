import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from '@material-ui/icons/Search';
import CodeIcon from '@material-ui/icons/Code';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={ Link } to="/select" >
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItem>
    <ListItem button component={ Link } to='/script' >
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="Script" />
    </ListItem>
  </div>
);
