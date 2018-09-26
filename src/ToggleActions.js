import React from 'react';
import {  Paper, Button, Grid    } from '@material-ui/core';
import  DeleteIcon  from '@material-ui/icons/Delete';

const styles={
  buttonBar:{
    marginTop:10,
    padding:10
  }
};
class ToggleActions extends React.Component{
   constructor(props){
     super(props);
   }
  render(){
      return(
        <Paper elevation={1} style={styles.buttonBar}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
        <Button variant="contained" color="secondary" onClick={this.props.onDelete} >
          Delete Selection
          <DeleteIcon />
        </Button>
        <Button variant="contained" color="primary" onClick={this.props.onDelete} >
          Download XML
          <DeleteIcon />
        </Button>
        </Grid>
        </Paper>
      );
  }

}
export default ToggleActions;
