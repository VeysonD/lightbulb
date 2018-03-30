import React, { Component } from 'react';
import lightOn from '../assets/light-on.png';
import lightOff from '../assets/light-off.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  handleSwitch() {
    const light = this.state.on;
    this.setState({
      on: !light,
    });
  }
  render() {
    return (
      <div>
        {this.state.on
          ?
            <img src={lightOn} alt="lightbulb on" />
          :
            <img src={lightOff} alt="lightbulb off" />
        }
        <button onClick={this.handleSwitch}>Light switch</button>
      </div>
    );
  }
}

export default App;
