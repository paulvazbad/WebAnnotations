import React, { Component } from 'react';
import {  Paper } from '@material-ui/core';
import ToggleActions from './ToggleActions.js';




class Canvas extends Component {
  constructor(props){
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  state={ rectangleDone:false, initialX:null, initialY:null, finalX:null, finalY:null,
    originalW:null, originalH:null};
  isDragging=false;
  fX=0;
  fY=0;
  onMouseDown({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        this.isDragging=true;
        if(this.state.initialX&&this.state.initialY || this.state.rectangleDone){
          return;

        }
        else{
          this.setState({initialX:offsetX, initialY:offsetY});
        }
      }
  onDelete(){
    this.setState({rectangleDone:false, initialX:null, initialY:null, finalX:null, finalY:null});
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d");
    const img = this.refs.image
    let newImgHeight = 600;
    let newimgWith = (600*img.width)/img.height;
    canvas.width = (600*img.width)/img.height;
    ctx.drawImage(img, 0, 0, newimgWith , newImgHeight);
  }
  onMouseMove({nativeEvent}){
    if(this.isDragging && !this.state.rectangleDone){
      this.fX=nativeEvent.offsetX;
      this.fY = nativeEvent.offsetY;
      this.setState({finalX:nativeEvent.offsetX, finalY:nativeEvent.offsetY});
      this.updateCanvas();
      //Clear canvas and draw new rectangle
      //Update  maxY and maxX
    }
  }

  onMouseUp(){
    this.isDragging=false;
    this.setState({rectangleDone:true, snack:false});

  }

  updateCanvas(){
    //Resetea el canvas a solamente la imagen
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d");
    const img = this.refs.image
    let newImgHeight = 600;
    let newimgWith = (600*img.width)/img.height;
    canvas.width = (600*img.width)/img.height;
    ctx.drawImage(img, 0, 0, newimgWith , newImgHeight);
    //Dibuja el nuevo rectangulo
  const  {initialX, initialY,finalX,finalY} = this.state;
  let fileName="";
  fileName = this.props.fileName;
    ctx.strokeStyle="#FF0000";
    ctx.fillStyle="#00FF00";
    if(finalX&&finalY){
        ctx.strokeRect(initialX,initialY,finalX-initialX,finalY-initialY);
        ctx.fillRect(initialX-4,initialY-4,8,8);
        ctx.fillRect(initialX-4,finalY-4,8,8);
        ctx.fillRect(finalX-4,initialY-4,8,8);
        ctx.fillRect(finalX-4,finalY-4,8,8);
    }
    else{
      return;
    }

  }


  componentDidMount() {


    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d");
    const img = this.refs.image

    img.onload = () => {
      this.setState({snack:true, originalH:img.height, originalW:img.width});
      let newImgHeight = 600;
      let newimgWith = (600*img.width)/img.height;
      canvas.width = (600*img.width)/img.height;
      ctx.drawImage(img, 0, 0, newimgWith , newImgHeight);
      const  {initialX, initialY,finalX,finalY} = this.state;
      let fileName="";
      fileName = this.props.fileName;
        ctx.strokeStyle="#FF0000";
        ctx.fillStyle="#00FF00";
        if(finalX&&finalY){
            ctx.strokeRect(initialX,initialY,finalX-initialX,finalY-initialY);
            ctx.fillRect(initialX-4,initialY-4,8,8);
            ctx.fillRect(initialX-4,finalY-4,8,8);
            ctx.fillRect(finalX-4,initialY-4,8,8);
            ctx.fillRect(finalX-4,finalY-4,8,8);
        }
        else{
          return;
        }
    }
  }

  render() {

    return (
      <div>
      <Paper elevation={1} >
      <canvas ref="canvas" height={600} style={{cursor:'pointer'}} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}/>
        <img  ref="image" src={this.props.img} resizemode="stretch" alt=""  style={{display: 'none'}} />
      </Paper>
      <ToggleActions azureInfo={this.props.azureInfo} infImg={this.state} onDelete={this.onDelete} fileName={this.props.fileName} tag={this.props.tag} img={this.props.img} fullFile={this.props.fullFile}/>

      </div>
    );
  }
}

export default Canvas;
