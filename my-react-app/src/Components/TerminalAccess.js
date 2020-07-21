import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export default class TerminalAccess extends Component {
constructor(props){
    super(props);
    this.state={
        commandData:''
    }
}
render(){
<MuiThemeProvider>
            <Tabs>
                 <Tab label="Docker Administration" >
                 <center>
                 <div className="parentContainer">
                 <h4>Run docker administration commands here</h4>
                  <div>
                        {this.state.commandData}
                  </div>    
                 </div>
                 </center>
             </Tab>
            </Tabs>
        </MuiThemeProvider>        
}
}