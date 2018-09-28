import React, { Component } from 'react';
import {Grid, Button, Card, CardContent, CardActions, Typography, Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText, TextField, Snackbar   } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Canvas from './Canvas.js';
import 'typeface-roboto';

const input={
  width:' 0.1',
  height: '0.1',
  opacity: '0',
  overflow: 'hidden',
  position: 'absolute',
};
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop:  2,
    paddingBottom:  2,
    background: '#FFFFFF',
    marginBottom:1,
  },
  colorText:{
    color: 'gray'
  }
});
class ImagePicker extends Component {

  state = {
    imagePicked: null,
    fileName:"",
    files:[],
    tag:null,
    dialog:false,
    snack:null

  };

  handleClose = () => {
      this.setState({ snack: false });
    };
  fileChangedHandler = (event) =>{
    const file = event.target.files[0];
    console.log(event.target.files);
    console.log(event.target.files[0]);
    this.setState({imagePicked: URL.createObjectURL(file), fileName:file.name,  files:event.target.files, snack:true});
  }



  onTag(){
    let TempTag=this.state.tag;
    return(
      <Dialog
        open={this.state.dialog}
        onClose={()=>{this.setState({dialog:false})}}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Insert tag</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="standard-with-placeholder"
            label="Tag"
            placeholder={this.state.tag}
            margin="dense"
            id="name"
            type="text"
            fullWidth
            onChange={(event)=>{TempTag= event.target.value}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{this.setState({dialog:false})}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{this.setState({dialog:false, tag: TempTag})}} color="primary">
            Save Tag
          </Button>
        </DialogActions>
      </Dialog>
    );
   }

   renderCanvas(){
    if(this.state.imagePicked){
      console.log(this.state.fileName);
      const files = [...this.state.files]
      return files.map(file =>
    <Canvas img={ URL.createObjectURL(file)} snack={true} fileName={file.name} azureInfo={this.props.azureInfo} tag={this.state.tag} fullFile={file}/>
      );

    }
    else{
     return(
       <Card className={this.props.classes.root}>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
          <CardContent>
            <Typography variant="headline" component="h1" color='inherit'>
            Welcome to WebAnnotations!
            </Typography>
            <Typography component="p" className={this.props.classes.colorText}>
            The web-based graphical image annotation tool.
            </Typography>
            <Typography component="p" color='inherit'>
            <br/>
             1. Load the images.<br/>
             2. Select the area of interest. <br/>
             3. Assign the tag to the area. <br/>
             4. Download XML <br/>
             <br />
            </Typography>
          </CardContent>
          <CardActions>
             <input type="file" name="file" id="file"  onChange={this.fileChangedHandler} accept="image/*" style={{display: 'none'}} multiple/>
             <Button variant="extendedFab" size="large" color="primary" >
             <label  for="file">
              Load the images
              </label>
             </Button>
             <Button variant="extendedFab" size="large" color="secondary" onClick={()=> {this.setState({dialog:true})}}>
              Set default label
             </Button>
           </CardActions>
         </Grid>
        </Card>);
    }
}

  render(){
    return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      style={{paddingTop:20, paddingBottom: 20}}
    >
      {this.onTag()}
      {this.renderCanvas()}
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snack}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">File succesfully uploaded</span>}
        />
    </Grid>
    );
  }
}

export default withStyles(styles)(ImagePicker);
