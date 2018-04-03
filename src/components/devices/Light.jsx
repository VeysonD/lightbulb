import React, { Component } from 'react';

import lightOn from '../../assets/light-on.png';
import lightOff from '../../assets/light-off.png';

export default class Light extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  handleSwitch() {
    const { on } = this.state;
    this.setState({
      on: !on,
    });
  }
  render() {
    const { on } = this.state;
    return (
      <div>
        {on
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
