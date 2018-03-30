import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
    };
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
        App is running
      </div>
    );
  }
}

export default App;
