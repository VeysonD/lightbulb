const ClockSchema = (sequelize, DataTypes) => {
  const Clock = sequelize.define('clock', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    on: DataTypes.BOOLEAN,
    timezone: DataTypes.STRING,
    daylights_saving: DataTypes.BOOLEAN,
    twentyfour_hour: DataTypes.BOOLEAN,
    hour_offset: DataTypes.INTEGER,
    minute_offset: DataTypes.INTEGER,
  });
  Clock.assosciate = (models) => {
    Clock.belongsTo(models.wifi);
  };
  return Clock;
};

export default ClockSchema;
