import React, { Component } from 'react';
import Light from './devices/Light';

import './../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addLight: false,
      lights: [],
      loaded: false,
      wifis: [],
    };
    this.handleLightSubmit = this.handleLightSubmit.bind(this);
    this.handleNewLight = this.handleNewLight.bind(this);
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
        this.setState({
          wifis,
          loaded: true,
        });
      }, (error) => {
        console.error(error);
      });
  }
  handleLightSubmit() {
    const lightInfo = {};
    document.querySelectorAll('#add-light input').forEach((input) => {
      lightInfo[input.name] = input.value;
    });
    fetch('/api/lights/new', {
      body: JSON.stringify(lightInfo),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(() => {
        this.setState({
          addLight: false,
        });
        this.fetchLights();
      }, (error) => {
        console.error(error);
      });
  }
  handleNewLight() {
    this.setState({
      addLight: !this.state.addLight,
    });
  }
  render() {
    const {
      addLight, lights, loaded, wifis,
    } = this.state;

    return (
      <div className="app">
        <nav className="app-nav">
          <li>
            {addLight
              ?
                <div id="add-light">
                  <form name="light-form">
                    <p>Light name: <input name="name" type="text" /></p>
                    <p>Light color: <input name="color" type="text" /></p>
                    <p>Light dim: <input name="dim" type="number" /></p>
                    <p>Light ip: <input name="ip" type="text" /></p>
                    <p>Latitude: <input name="latitude" type="number" /></p>
                    <p>Longitude: <input name="longitude" type="number" /></p>
                    <p>Location: <input name="location" type="text" /></p>
                    <p>WiFi: <input name="wifi" type="text" /></p>
                    <p>WiFi Password: <input name="wifiPass" type="password" /></p>
                    <p>Currently on: <input name="switchedOn" type="checkbox" /></p>
                    <p>Currently charging: <input name="charging" type="checkbox" /></p>
                  </form>
                  <button onClick={this.handleLightSubmit}>Submit</button>
                  <button onClick={this.handleNewLight}>Cancel</button>
                </div>
              :
                <button onClick={this.handleNewLight}>Add new light</button>
            }
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
