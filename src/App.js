import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import Header from './Header.js';
import ImagePicker from './ImagePicker.js';
import {Button, CardContent, Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText, TextField   } from '@material-ui/core/';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

class App extends Component {
  constructor(props){
    super(props);
    this.onAzureInfo = this.onAzureInfo.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  state = {
    AzureInfoDialog:false,
    AzureInfo:{AZURE_STORAGE_ACCOUNT: null,AZURE_STORAGE_ACCESS_KEY:null, AZURE_STORAGE_CONNECTION_STRING:null}
  };
  onClick(){
    this.setState({AzureInfoDialog:true});
  }
  onAzureInfo(){
    console.log("Insert Azure info");
    let TempAZURE_STORAGE_ACCOUNT=this.state.AzureInfo.AZURE_STORAGE_ACCOUNT;
    let TempAZURE_STORAGE_ACCESS_KEY=this.state.AzureInfo.AZURE_STORAGE_ACCESS_KEY;
    let TempAZURE_STORAGE_CONNECTION_STRING = this.state.AzureInfo.AZURE_STORAGE_CONNECTION_STRING;
      return(
        <Dialog
          open={this.state.AzureInfoDialog}
          onClose={()=>{this.setState({AzureInfoDialog:false})}}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Insert Azure info</DialogTitle>
          <DialogContent>
          <DialogContentText>
            Please fill the following information regarding your Azure Storage Account.
            </DialogContentText>
            <TextField
              autoFocus
              id="standard-with-placeholder"
              label="Azure storage account"
              placeholder={this.state.AzureInfo.AZURE_STORAGE_ACCOUNT}
              margin="dense"
              type="password"
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
              type="password"
              fullWidth
              onChange={(event)=>{TempAZURE_STORAGE_ACCESS_KEY= event.target.value}}
            />
          </DialogContent>
          <DialogContentText>
            </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              id="standard-with-placeholder"
              label="Azure storage connection string"
              placeholder={this.state.AzureInfo.AZURE_STORAGE_CONNECTION_STRING}
              margin="dense"
              type="password"
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
              Save Azure info
            </Button>
          </DialogActions>
        </Dialog>
      );
 }
  componentDidMount(){
      document.title = "WebAnnotations"
    }
  render() {
    return (
    <MuiThemeProvider theme={theme}>
      <Header onAzureInfo={this.onClick}/>
      {
        this.onAzureInfo()
      }
      <ImagePicker azureInfo={this.state.AzureInfo}/>
      </MuiThemeProvider>
    );
  }
}

export default App;
