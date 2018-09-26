import React from 'react';
import ReactDOM from 'react-dom';
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

     const {initialX, initialY,finalX,finalY, rectangleDone, originalH, originalW} = this.props.infImg;
     console.log(this.props);
     if(!rectangleDone){
       return;
     }
     let minX = initialX>finalX? finalX: initialX;
     let minY = initialY>finalY? finalY: initialY;
     let maxX = initialX>finalX? initialX: finalX;
     let maxY = initialY>finalY? initialY: finalY;
     minX = Math.floor(minX*(originalW/((600*originalW)/originalH)));
     maxX= Math.floor(maxX*(originalW/((600*originalW)/originalH)));
     minY = Math.floor(minY*(originalH/600));
     maxY = Math.floor(maxY *(originalH/600));
     //Hacer el pop up de las variables a llenar
     var xmlString = '<annotation><folder>Tecate Caguama Light</folder> \n'+
     	'<filename>'+this.props.fileName+'</filename>'+' \n'+
     '<path>C:\\Users\\pev\\Documents\\TEC\\5to semestre\\Semanai\\tensorflow\\raccoon_dataset\\models\\images\\Tecate Caguama Light\\'+this.props.fileName+'.JPG</path> \n'+
     	'<source> \n'+
     		'<database>Unknown</database> \n'+
     	'</source> \n'+
     	'<size> \n'+
     		'<width>0</width> \n'+
     		'<height>0</height> \n'+
     		'<depth>3</depth> \n'+
     '</size> \n'+
     '	<segmented>0</segmented> \n'+
     	'<object> \n'+
     	'	<name>TLB</name> \n'+
     	'	<pose>Unspecified</pose> \n'+
     		'<truncated>0</truncated> \n'+
     		'<difficult>0</difficult> \n'+
     		'<bndbox> \n'+
     			'<xmin>'+ minX+'</xmin> \n'+
     			'<ymin>'+minY+'</ymin> \n'+
     			'<xmax>'+maxX+'</xmax> \n'+
     			'<ymax>'+maxY+'</ymax> \n'+
     	  '</bndbox> \n'+
     	'</object> \n'+
     '</annotation> \n';
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml"); //important to use "text/xml"
    var elements = xmlDoc.getElementsByTagName("bndbox");
    var fileDownload = require('js-file-download');
    fileDownload(xmlString, this.props.fileName+'.xml');
    console.log(xmlDoc);
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
