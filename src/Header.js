import React, { Component } from 'react';
import {AppBar, Toolbar, Typography  } from '@material-ui/core/';
import 'typeface-roboto';



class Header extends Component {
  render() {
    return (
    <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="default">
            Label Picker
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
