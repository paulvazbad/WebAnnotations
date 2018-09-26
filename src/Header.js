import React, { Component } from 'react';
import {AppBar, Toolbar, Typography  } from '@material-ui/core/';
import 'typeface-roboto';



class Header extends Component {
  render() {
    return (
    <AppBar position="static" color="default">
        <Toolbar>
        <a href ='/' style={{textDecoration: 'none'}}>
          <Typography variant="title" color="default">

            Label Picker

          </Typography>
            </a>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
