import React, { Component } from 'react';
import {Grid} from '@material-ui/core/';
import Canvas from './Canvas.js';
import 'typeface-roboto';

class ImagePicker extends Component {
  state = {
    imagePicked: null
  };

  fileChangedHandler = (event) =>{
    const file = event.target.files[0];
    console.log(file);
    this.setState({imagePicked: URL.createObjectURL(file)});
  }
   renderCanvas = () =>{
    if(this.state.imagePicked){

      return (
        <Canvas img={this.state.imagePicked} snack={true}/>
        );

    }
    else{
     return <input type="file" onChange={this.fileChangedHandler} />
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
