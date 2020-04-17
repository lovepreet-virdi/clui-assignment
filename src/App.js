import React, { Component } from 'react';
import { Session } from '@replit/clui-session';
import './App.css';
import MyPrompt from './myPrompt';
import clear from './commands/clear';
import customCommand from './commands/custom';
class App extends Component {
  render() {
    const command = {
      commands: {

        customCommand,
        clear,
      }
    }
    return (
      <div className="terminal">
        <Session>

          <MyPrompt command={command} />
        </Session>
      </div>
    );
  }

}

export default App;
