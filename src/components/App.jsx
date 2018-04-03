import React, { Component } from 'react';
import Light from './devices/Light';

import './../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lights: [],
      loaded: false,
      wifis: [],
    };
  }

  componentDidMount() {
    const wifiList = [];
    fetch('/api/wifis/all')
      .then(res => res.json())
      .then((wifis) => {
        console.log('What are the wifis: ', wifis);
        wifiList.push(...wifis);
      }, (error) => {
        console.error(error);
      });
    fetch('/api/lights/all')
      .then(res => res.json())
      .then((lights) => {
        console.log('What are the lights: ', lights);
        this.setState({
          lights,
          loaded: true,
          wifis: wifiList,
        });
      }, (error) => {
        console.error(error);
      });
  }
  render() {
    const { lights, loaded } = this.state;
    console.log('loaded: ', loaded);
    return (
      <div className="app">
        <nav>
          <li>
            <button>Add new light</button>
          </li>
          <li>
            <button>Change Dim</button>
          </li>
          <li>
            <button>Change Color</button>
          </li>
          <li>
            <button>Update IP</button>
          </li>
        </nav>
        <div className="devices">
          <div className="lights">
            {loaded
              ?
              lights.map(light =>
                (
                  <Light
                    name={light.name}
                    dim={light.dim}
                    ip={light.ip}
                    location={light.location}
                    switch={light.switched_on}
                  />
              ))
              :
              <div>Loading your devices</div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
