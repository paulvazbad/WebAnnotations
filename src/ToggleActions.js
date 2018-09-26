import React from 'react';
import {  Paper, Button, Grid    } from '@material-ui/core';
import  DeleteIcon  from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const styles={
  buttonBar:{
    marginTop:10,
    padding:10
  }
};
class ToggleActions extends React.Component{
   constructor(props){
     super(props);
     this.SaveXML = this.SaveXML.bind(this);
   }
   SaveXML(){
     console.log("Save XML")
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
          <DeleteIcon style={{marginLeft:10}}/>
        </Button>
        <Button variant="contained" color="primary" onClick={this.SaveXML} >
          Download XML
          <CloudDownloadIcon style={{marginLeft:10}} />
        </Button>
        </Grid>
        </Paper>
      );
  }

}
export default ToggleActions;
