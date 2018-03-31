const WifiSchema = (sequelize, DataTypes) => {
  const Wifi = sequelize.define('wifi', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ssid: DataTypes.STRING,
    password: DataTypes.STRING,
    protocol: DataTypes.STRING,
    security_type: DataTypes.STRING,
    network_band: DataTypes.STRING,
    network_channel: DataTypes.INTEGER,
    ip4_address: DataTypes.STRING,
    ip4_dns: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    location: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    description: DataTypes.STRING,
    driver_version: DataTypes.STRING,
    physical_address: DataTypes.STRING,
  });

  Wifi.associate = (models) => {
    Wifi.hasMany(models.light);
    Wifi.hasMany(models.clock);
    Wifi.hasMany(models.changelog);
  };
  return Wifi;
};

export default WifiSchema;
