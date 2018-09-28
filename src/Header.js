import React, { Component } from 'react';
import {AppBar, Toolbar, Typography, Button  } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  azureButton: {
    marginLeft: 12,
    backgroundColor: 'green'
  },

};



class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {classes}= this.props;
    return (
  <div className={classes.root}>
    <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="default" className={classes.grow}>
            <a href ='/WebAnnotations/' style={{textDecoration: 'none', color:'white'}}>
            WebAnnotations
            </a>
          </Typography>
             <Button color="green" className={classes.azureButton} onClick={this.props.onAzureInfo}>Enter Azure Account</Button>
        </Toolbar>
      </AppBar>
  </div>
    );
  }
}

export default  withStyles(styles)(Header);
