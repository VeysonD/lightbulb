import dotenv from 'dotenv';

dotenv.config();

import db from './config';

// const addLight = () => db.light.create({
//   charging: false,
//   color: 'white',
//   dim: true,
//   ip: '127.0.0.1',
//   latitude: -122.417477,
//   longitude: 37.76435775,
//   location: '(37.764357751686, -122.41747701285)',
//   name: 'Reading light',
//   on: true,
//   changelogs: [
//     {
//       log: 'Reading light was turned on at 2:23PM',
//     },
//     {
//       log: 'Reading light was moved to (37.764357751686, -122.41747701285) at 1:00PM',
//     },
//     {
//       log: 'Reading light switched Wi-Fi to McWifi',
//     },
//   ],
// }, {
//   include: [db.changelog],
// });
//
// const addClock = () => db.clock.create({
//   name: 'Living room clock',
//   on: true,
//   daylights_saving: false,
//   hour_offset: 0,
//   minute_offset: 0,
//   timezome: 'PST',
//   twentyfour_hour: true,
//   ip: '127.0.0.1',
//   latitude: -120.417477,
//   longitude: 30.76435775,
//   location: '(30.764357751686, -120.41747701285)',
//   changelogs: [
//     {
//       log: 'Living room clock was turned on at 1:23PM',
//     },
//     {
//       log: 'Living room clock was moved to (30.764357751686, -120.41747701285) at 10:00PM',
//     },
//     {
//       log: 'Living room clock switched Wi-Fi to McWifi at 5:00AM',
//     },
//   ],
// }, {
//   include: [db.changelog],
// });
//
// const addWifi = () => db.wifi.create({
//   ssid: 'McWifi',
//   password: 'abc123',
//   protocol: '802.11n',
//   security_type: 'WPA2-Personal',
//   network_band: '2.4 GHz',
//   network_channel: '1',
//   ip4_address: '192.168.1.6',
//   ip4_dns: '192.168.1.1',
//   latitude: -120.42000000,
//   longitude: 30.77000000,
//   location: '(30.77000000, -120.42000000)',
//   manufacturer: 'Wifi Inc.',
//   description: 'Wifi Inc. wireless network adapter',
//   driver_version: '3.0.0.000',
//   physical_address: 'AA-AA-AA-AA-AA-AA',
//   changelogs: [
//     {
//       log: 'McWifi was turned on at 1:01AM',
//     },
//     {
//       log: 'McWifi was moved to (30.77000000, -120.42000000) at 1:10AM',
//     },
//   ],
// }, {
//   include: [
//     db.changelog,
//     // db.clock,
//     // db.light,
//   ],
// });
//
// const dbClose = () => db.sequelize.close();
//
// db.sequelize.sync({
//   force: true,
// })
//   .then(() => Promise.all([addLight(), addClock(), addWifi()]))
//   .then(dbClose);
