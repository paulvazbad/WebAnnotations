import React, { Component } from 'react';
import {Grid, Button, Card, CardContent, CardActions, Typography   } from '@material-ui/core/';
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
});
class ImagePicker extends Component {

  state = {
    imagePicked: null,
    fileName:"",
    files:[]
  };


  fileChangedHandler = (event) =>{
    const file = event.target.files[0];
    console.log(event.target.files);
    console.log(event.target.files[0]);
    this.setState({imagePicked: URL.createObjectURL(file), fileName:file.name,  files:event.target.files});
  }

   renderCanvas(){
    if(this.state.imagePicked){
      console.log(this.state.fileName);
      const files = [...this.state.files]
      return files.map(file =>
    <Canvas img={ URL.createObjectURL(file)} snack={true} fileName={file.name}/>
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
            Welcome to LabelPicker!
            </Typography>
            <Typography component="p" color='inherit'>
            <br/>
             1. Load the images.<br/>
             2. Select the area of interest <br/>
             3. Assign the tag to the area <br/>
             4. Download XML <br/>
             <br />
            </Typography>
          </CardContent>
          <CardActions>
             <input type="file" name="file" id="file" class="input" onChange={this.fileChangedHandler} accept="image/*" style={{display: 'none'}} multiple/>
             <Button variant="extendedFab" size="large" >
             <label  for="file">
              Load the images
              </label>
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
      {this.renderCanvas()}
    </Grid>
    );
  }
}

export default withStyles(styles)(ImagePicker);
