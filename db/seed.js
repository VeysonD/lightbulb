import dotenv from 'dotenv';

dotenv.config();

const db = require('./db-config').default;

const addLight = () => db.light.create({
  charging: false,
  color: 'white',
  dim: 0,
  ip: '127.0.0.1',
  latitude: 37.76435775,
  longitude: -122.417477,
  location: '(37.764357751686, -122.41747701285)',
  name: 'Reading light',
  switched_on: true,
  connected_wifi: true,
  wifiId: 1,
  wifi_pass: 'abc123',
});

const addClock = () => db.clock.create({
  name: 'Living room clock',
  switched_on: true,
  daylights_saving: false,
  hour_offset: 0,
  minute_offset: 0,
  timezone: 'PST',
  twentyfour_hour: true,
  ip: '127.0.0.1',
  latitude: 30.76435775,
  longitude: -120.417477,
  location: '(30.764357751686, -120.41747701285)',
  connected_wifi: true,
  wifiId: 1,
  wifi_pass: 'abc123',
});

const addWifi = () => db.wifi.create({
  ssid: 'McWifi',
  password: 'abc123',
  protocol: '802.11n',
  switched_on: true,
  security_type: 'WPA2-Personal',
  network_band: '2.4 GHz',
  network_channel: '1',
  ip4_address: '192.168.1.6',
  ip4_dns: '192.168.1.1',
  latitude: 30.77000000,
  longitude: -120.42000000,
  location: '(30.77000000, -120.42000000)',
  manufacturer: 'Wifi Inc.',
  description: 'Wifi Inc. wireless network adapter',
  driver_version: '3.0.0.000',
  physical_address: 'AA-AA-AA-AA-AA-AA',
});

const addChangelogs = () => db.changelog.bulkCreate([
  {
    log: 'Reading light was turned on',
    lightId: 1,
  },
  {
    log: 'Reading light was moved to (37.764357751686, -122.41747701285)',
    lightId: 1,
  },
  {
    log: 'Reading light switched Wi-Fi to McWifi',
    lightId: 1,
  },
  {
    log: 'Living room clock was turned on',
    clockId: 1,
  },
  {
    log: 'Living room clock was moved to (30.764357751686, -120.41747701285)',
    clockId: 1,
  },
  {
    log: 'Living room clock switched Wi-Fi to McWifi',
    clockId: 1,
  },
  {
    log: 'McWifi was turned on',
    wifiId: 1,
  },
  {
    log: 'McWifi was moved to (30.77000000, -120.42000000)',
    wifiId: 1,
  },
]);

const dbClose = () => db.sequelize.close();

db.sequelize.sync({
  force: true,
})
  .then(addWifi)
  .then(addClock)
  .then(addLight)
  .then(addChangelogs)
  .then(dbClose);
