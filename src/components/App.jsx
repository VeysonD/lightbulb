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
    this.fetchLights = this.fetchLights.bind(this);
    this.fetchWifis = this.fetchWifis.bind(this);
  }

  componentDidMount() {
    this.fetchLights();
    this.fetchWifis();
  }
  fetchLights() {
    fetch('/api/lights/all')
      .then(res => res.json())
      .then((lights) => {
        console.log('What are the lights: ', lights);
        this.setState({
          lights,
        });
      }, (error) => {
        console.error(error);
      });
  }
  fetchWifis() {
    fetch('/api/wifis/all')
      .then(res => res.json())
      .then((wifis) => {
        console.log('What are the wifis: ', wifis);
        this.setState({
          wifis,
          loaded: true,
        });
      }, (error) => {
        console.error(error);
      });
  }
  render() {
    const { lights, loaded, wifis } = this.state;

    return (
      <div className="app">
        <nav className="app-nav">
          <li>
            <button>Add new light [COMING SOON]</button>
          </li>
        </nav>
        <div className="devices">
          <div className="lights">
            {loaded
              ?
              lights.map((light) => {
                const lightWifi = wifis.filter(wifi => wifi.id === light.wifi_id)[0];
                console.log('What is the lightWifi: ', lightWifi);
                return (
                  <Light
                    name={light.name}
                    dim={light.dim}
                    fetchHandler={this.fetchLights}
                    key={light.id}
                    id={light.id}
                    ip={light.ip}
                    location={light.location}
                    switched={light.switched_on}
                    wifi={lightWifi.ssid}
                  />
                );
              })
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
