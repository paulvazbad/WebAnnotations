import React, { Component } from 'react';
import {Grid} from '@material-ui/core/';
import Canvas from './Canvas.js';
import 'typeface-roboto';

class ImagePicker extends Component {
  state = {
    imagePicked: null,
    fileName:""
  };
  fileChangedHandler = (event) =>{
    const file = event.target.files[0];
    console.log(event.target.files);
    console.log(event.target.files[0]);
    this.setState({imagePicked: URL.createObjectURL(file), fileName:file.name});
  }
   renderCanvas = () =>{
    if(this.state.imagePicked){
      console.log(this.state.fileName);
      return (
        <Canvas img={this.state.imagePicked} snack={true} fileName={this.state.fileName}/>
        );

    }
    else{
     return(<input type="file" onChange={this.fileChangedHandler} accept="image/*" />);
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

export default ImagePicker;
