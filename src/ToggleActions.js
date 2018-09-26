import React from 'react';
import ReactDOM from 'react-dom';
import {  Paper, Button, Grid, Snackbar,TextField   } from '@material-ui/core';
import  DeleteIcon  from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import BookMarkIcon from '@material-ui/icons/Bookmark';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles={
  buttonBar:{
    marginTop:0,
    marginBottom:10,
    padding:10
  },
  root:{
    background:'#B71C1C'
  }
};
class ToggleActions extends React.Component{
   constructor(props){
     super(props);
     this.SaveXML = this.SaveXML.bind(this);
     this.insertTags = this.insertTags.bind(this);
     this.onTag = this.onTag.bind(this);

   }
   state ={snack:null, dialog:false, tag:null};

   handleClose = () => {
       this.setState({ snack: false });
     };

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

    insertTags(){
      if(this.props.infImg.rectangleDone){
        let assignTagText;
        let ButColor;
        if(this.state.tag){
          assignTagText = "Modify Tag";
          ButColor = "default"
        }
        else{
          assignTagText = "Assign Tag"
          ButColor = "inherit"
        }
        return(<Button variant="contained" color={ButColor} onClick={()=>{this.setState({dialog:true})}} >
          {assignTagText}
          <BookMarkIcon style={{marginLeft:10}}/>
        </Button>);
      }
    }

   SaveXML(){
     const {initialX, initialY,finalX,finalY, rectangleDone, originalH, originalW} = this.props.infImg;
     if(!rectangleDone || !this.state.tag){
       this.setState({snack:true});
       return;
     }
     let fileName = this.props.fileName.replace(/\.[^/.]+$/, "");
     let minX = initialX>finalX? finalX: initialX;
     let minY = initialY>finalY? finalY: initialY;
     let maxX = initialX>finalX? initialX: finalX;
     let maxY = initialY>finalY? initialY: finalY;
     minX = Math.floor(minX*(originalW/((600*originalW)/originalH)));
     maxX= Math.floor(maxX*(originalW/((600*originalW)/originalH)));
     minY = Math.floor(minY*(originalH/600));
     maxY = Math.floor(maxY *(originalH/600));
     //Hacer el pop up de las variables a llenar
     var xmlString = '<annotation><folder>'+this.state.tag+'</folder>'+' \n'+
     	'<filename>'+fileName+'</filename>'+' \n'+
     '<path>C:\\Users\\pev\\Documents\\TEC\\5to semestre\\Semanai\\tensorflow\\raccoon_dataset\\models\\images\\'+fileName+'\\'+this.props.fileName+'</path> \n'+
     	'<source> \n'+
     		'<database>Unknown</database> \n'+
     	'</source> \n'+
     	'<size> \n'+
     		'<width>'+originalW+'</width> \n'+
     		'<height>'+originalH+'</height> \n'+
     		'<depth>3</depth> \n'+
     '</size> \n'+
     '	<segmented>0</segmented> \n'+
     	'<object> \n'+
     	'	<name>'+this.state.tag+'</name> \n'+
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
    fileDownload(xmlString, fileName+'.xml');
   }

  render(){
    const {classes}= this.props;
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
        {
          this.insertTags()
        }
        {
          this.onTag()
        }
        <Button variant="contained" color="primary" onClick={this.SaveXML} >
          Download XML
          <CloudDownloadIcon style={{marginLeft:10}} />
        </Button>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snack}
            autoHideDuration={1000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
              classes:{
                root:classes.root
              }
            }}
            message={<span id="message-id">Please select the desired region and assign the tag</span>}
          />
        </Grid>
        </Paper>
      );
  }

}
export default withStyles(styles)(ToggleActions);
