import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lightOn from '../../assets/light-on.png';
import lightOff from '../../assets/light-off.png';

import './../../styles/Light.css';

export default class Light extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      viewLogs: false,
    };
    this.handleLogs = this.handleLogs.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  handleLogs() {
    if (this.state.viewLogs) {
      this.setState({
        viewLogs: false,
      });
    } else {
      const { id } = this.props;
      fetch(`/api/lights/${id}/logs`)
        .then(res => res.json())
        .then((logs) => {
          this.setState({
            logs,
            viewLogs: true,
          });
        }, (error) => {
          console.error(error);
        });
    }
  }
  handleSwitch() {
    const { id } = this.props;
    fetch(`/api/lights/${id}/switch`, {
      method: 'POST',
    })
      .then(() => {
        this.props.fetchHandler();
      }, (error) => {
        console.error(error);
      });
  }
  render() {
    const {
      dim, ip, name, switched, wifi,
    } = this.props;
    const { logs, viewLogs } = this.state;
    const status = switched ? 'on' : 'off';
    return (
      <div className="light">
        <div className="lightbulb">
          {switched
            ?
              <img src={lightOn} alt="lightbulb on" />
            :
              <img src={lightOff} alt="lightbulb off" />
          }
        </div>
        <div className="light-info">
          <h1>Settings</h1>
          <li>Name: {name}</li>
          <li>Dim: {dim}%</li>
          <li>IP: {ip}</li>
          {switched
            ?
              <li>Status: {status}</li>
            :
              <li>Status: {status}</li>
          }
          <li>Wifi: {wifi}</li>
          <li>
            <button onClick={this.handleSwitch}>Light switch</button>
          </li>
          <li>
            {viewLogs
              ?
                <button onClick={this.handleLogs}>Close {name} logs</button>
              :
                <button onClick={this.handleLogs}>View {name} logs</button>
            }
          </li>
        </div>
        <div className="light-logs">
          <h1>{name} logs</h1>
          {viewLogs
            ?
            logs.map((log) => {
              const text = log.join(' at ');
              return (
                <li>{text}</li>
              );
            })
            :
            <pre />
          }
        </div>
      </div>
    );
  }
}

Light.propTypes = {
  dim: PropTypes.number.isRequired,
  fetchHandler: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  ip: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  switched: PropTypes.bool.isRequired,
  wifi: PropTypes.string.isRequired,
};
