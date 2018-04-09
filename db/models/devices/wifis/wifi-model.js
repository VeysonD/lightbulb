import { hashPass } from './../../../utils/password-hash';

const WifiSchema = (sequelize, DataTypes) => {
  const Wifi = sequelize.define('wifi', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ssid: { type: DataTypes.STRING, allowNull: false },
    password: DataTypes.STRING,
    switched_on: DataTypes.BOOLEAN,
    protocol: { type: DataTypes.STRING, allowNull: false },
    security_type: { type: DataTypes.STRING, allowNull: false },
    network_band: { type: DataTypes.STRING, allowNull: false },
    network_channel: { type: DataTypes.STRING, allowNull: false },
    ip4_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      },
    },
    ip4_dns: {
      type: DataTypes.STRING,
      validate: {
        isIP: true,
      },
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { min: -90, max: 90 },
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { min: -180, max: 180 },
    },
    location: { type: DataTypes.STRING, allowNull: false },
    manufacturer: DataTypes.STRING,
    description: DataTypes.STRING,
    driver_version: DataTypes.STRING,
    physical_address: { type: DataTypes.STRING, allowNull: false },
  }, {
    hooks: {
      beforeCreate: (instance) => {
        const { password } = instance.dataValues;
        hashPass(password, 10)
          .then((hash) => {
            console.log('hash: ', hash);
            console.log('instance: ', instance);
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  });

  Wifi.associate = (models) => {
    Wifi.hasMany(models.light);
    Wifi.hasMany(models.clock);
    Wifi.hasMany(models.changelog);
  };
  return Wifi;
};

export default WifiSchema;
