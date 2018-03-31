const ClockSchema = (sequelize, DataTypes) => {
  const Clock = sequelize.define('clock', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    daylights_saving: DataTypes.BOOLEAN,
    hour_offset: DataTypes.INTEGER,
    location: DataTypes.GEOMETRY,
    minute_offset: DataTypes.INTEGER,
    on: DataTypes.BOOLEAN,
    timezone: DataTypes.STRING,
    twentyfour_hour: DataTypes.BOOLEAN,
  });
  Clock.assosciate = (models) => {
    Clock.belongsTo(models.wifi);
  };
  return Clock;
};

export default ClockSchema;
