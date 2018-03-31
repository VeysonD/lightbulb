const ClockSchema = (sequelize, DataTypes) => {
  const Clock = sequelize.define('clock', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    on: DataTypes.BOOLEAN,
    daylights_saving: DataTypes.BOOLEAN,
    hour_offset: DataTypes.INTEGER,
    minute_offset: DataTypes.INTEGER,
    timezone: DataTypes.STRING,
    twentyfour_hour: DataTypes.BOOLEAN,
    ip: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    location: DataTypes.STRING,
    connected_wifi: DataTypes.BOOLEAN,
    wifi_id: DataTypes.INTEGER,
  });
  Clock.associate = (models) => {
    Clock.belongsTo(models.wifi);
    Clock.hasMany(models.changelog);
  };
  return Clock;
};

export default ClockSchema;
