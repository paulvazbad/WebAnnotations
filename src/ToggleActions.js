import React from 'react';
import ReactDOM from 'react-dom';
import {  Paper, Button, Grid, Snackbar,TextField   } from '@material-ui/core';
import  DeleteIcon  from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
     this.generateXML = this.generateXML.bind(this);
     this.onAzureInfo = this.onAzureInfo.bind(this);
     this.pushToAzure =this.pushToAzure.bind(this);

   }
   componentDidMount(){
     this.setState({tag:this.props.tag});
   }
   state ={snack:null, dialog:false, tag:null, xmlString:null, AzureInfoDialog:false, AzureInfo:{AZURE_STORAGE_ACCOUNT: null,AZURE_STORAGE_ACCESS_KEY:null, AZURE_STORAGE_CONNECTION_STRING:null },
 snackAzure:null};

   handleClose = () => {
       this.setState({ snack: false, snackAzure:false });
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

     onAzureInfo(){
       let TempAZURE_STORAGE_ACCOUNT=this.state.AzureInfo.AZURE_STORAGE_ACCOUNT;
       let TempAZURE_STORAGE_ACCESS_KEY=this.state.AzureInfo.AZURE_STORAGE_ACCESS_KEY;
       let TempAZURE_STORAGE_CONNECTION_STRING = this.state.AzureInfo.AZURE_STORAGE_CONNECTION_STRING;
       const {rectangleDone} = this.props.infImg;
         return(
           <Dialog
             open={this.state.AzureInfoDialog}
             onClose={()=>{this.setState({AzureInfoDialog:false})}}
             aria-labelledby="form-dialog-title"
           >
             <DialogTitle id="form-dialog-title">Insert Azure info</DialogTitle>
             <DialogContent>
               <TextField
                 autoFocus
                 id="standard-with-placeholder"
                 label="Azure storage account"
                 placeholder={this.state.AzureInfo.AZURE_STORAGE_ACCOUNT}
                 margin="dense"
                 id="name"
                 type="text"
                 fullWidth
                 onChange={(event)=>{TempAZURE_STORAGE_ACCOUNT= event.target.value}}
               />
             </DialogContent>
             <DialogContent>
               <TextField
                 autoFocus
                 id="standard-with-placeholder"
                 label="Azure storage access key "
                 placeholder={this.state.AzureInfo.AZURE_STORAGE_ACCESS_KEY}
                 margin="dense"
                 id="name"
                 type="text"
                 fullWidth
                 onChange={(event)=>{TempAZURE_STORAGE_ACCESS_KEY= event.target.value}}
               />
             </DialogContent>
             <DialogContent>
               <TextField
                 autoFocus
                 id="standard-with-placeholder"
                 label="Azure storage access key "
                 placeholder={this.state.AzureInfo.AZURE_STORAGE_CONNECTION_STRING}
                 margin="dense"
                 id="name"
                 type="text"
                 fullWidth
                 onChange={(event)=>{TempAZURE_STORAGE_CONNECTION_STRING= event.target.value}}
               />
             </DialogContent>
             <DialogActions>
               <Button onClick={()=>{this.setState({AzureInfoDialog:false})}} color="primary">
                 Cancel
               </Button>
               <Button onClick={()=>{this.setState({AzureInfoDialog:false,
                 AzureInfo: {AZURE_STORAGE_ACCOUNT: TempAZURE_STORAGE_ACCOUNT,AZURE_STORAGE_ACCESS_KEY: TempAZURE_STORAGE_ACCESS_KEY,AZURE_STORAGE_CONNECTION_STRING:TempAZURE_STORAGE_CONNECTION_STRING}
               })}} color="primary">
                 Save Tags
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
    pushToAzure(){
      if(this.generateXML()){
        console.log("NO hay cuadros o tags");
        return;
      }
      else{


        const {accountName, accountKey} = this.state.AzureInfo;
        var azure = require('azure-storage');
        var fileService = azure.createFileService(accountName,accountKey);
        fileService.createShareIfNotExists('img', function(error, result, response) {
        if (error) {
          console.log("Couldn't create share");
          // if result = true, share was created.
          // if result = false, share already existed.
        }
        if(!result){
          console.log("Share already existed");
        }
      });

      fileService.createDirectoryIfNotExists('Equipo6', 'XMLdirectory', function(error, result, response) {
        if (error) {
          console.log("Couldn't create directory");
          // if result.created = true, share was created.
          // if result.created = false, share already existed.
        }
        if(!result.created){
        console.log("Directory already existed");
        }
        });
        let fileName = this.props.fileName.replace(/\.[^/.]+$/, "");
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(this.state.xmlString, "text/xml"); //important to use "text/xml"
      fileService.createFileFromLocalFile('img', 'Equipo6', fileName, xmlDoc, function(error, result, response) {
       if (!error) {
        console.log("File created");
       }
     });
   }
  }
    generateXML(){
      console.log("Generate XML");
      const {initialX, initialY,finalX,finalY, rectangleDone, originalH, originalW} = this.props.infImg;
      if(!rectangleDone || !this.state.tag){
        this.setState({snack:true});
        return true;
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
      var xmlString = '<annotation><folder>'+'annotations'+'</folder>'+' \n'+
      	'<filename>'+this.props.fileName+'</filename>'+' \n'+
      '<path>./annotations/'+this.props.fileName+'</path> \n'+
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
      this.setState({xmlString:xmlString});
    }

   SaveXML(){
    if(this.generateXML()){
      return;
    }
    let fileName = this.props.fileName.replace(/\.[^/.]+$/, "");
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(this.state.xmlString, "text/xml"); //important to use "text/xml"
    var elements = xmlDoc.getElementsByTagName("bndbox");
    var fileDownload = require('js-file-download');
    fileDownload(this.state.xmlString, fileName+'.xml');
   }

  render(){
    const {classes}= this.props;
      return(
        <Paper elevation={1} style={styles.buttonBar}>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
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
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
            <Button variant="contained" color="primary" onClick={()=>{
              if((this.state.AzureInfo.AZURE_STORAGE_ACCOUNT && this.state.AzureInfo.AZURE_STORAGE_ACCESS_KEY) || this.state.AzureInfo.AZURE_STORAGE_CONNECTION_STRING){
                this.pushToAzure();
              }
              else{
                this.setState({AzureInfoDialog:true});

              }
            }}>
              Upload to Azure
              <CloudUploadIcon style={{marginLeft:10}} />
            </Button>
            {
              this.onAzureInfo()
            }
            </Grid>
            <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.snackAzure}
                autoHideDuration={1000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                  classes:{
                    root:classes.root
                  }
                }}
                message={<span id="message-id">Please fill the Azure info</span>}
              />

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
