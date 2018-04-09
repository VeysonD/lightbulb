import addLog from './../../../../server/controllers/changelogs/changelog-ctrl';

const ClockSchema = (sequelize, DataTypes) => {
  const Clock = sequelize.define('clock', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    switched_on: { type: DataTypes.BOOLEAN, allowNull: false },
    daylights_saving: { type: DataTypes.BOOLEAN, allowNull: false },
    hour_offset: { type: DataTypes.INTEGER, allowNull: false },
    minute_offset: { type: DataTypes.INTEGER, allowNull: false },
    timezone: { type: DataTypes.STRING, allowNull: false },
    twentyfour_hour: { type: DataTypes.BOOLEAN, allowNull: false },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
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
    connected_wifi: { type: DataTypes.BOOLEAN, defaultValue: false },
    wifi_pass: { type: DataTypes.STRING, allowNull: false },
  }, {
    hooks: {
      beforeUpdate: (instance) => {
        const changed = instance.changed().filter(field => field !== 'updatedAt');
        if (changed.length !== 0) {
          const { id, name } = instance.dataValues;
          changed.forEach((change) => {
            const prev = instance.previous(change);
            const curr = instance.dataValues[change];
            const log = `${name}'s ${change} changed from ${prev} to ${curr}`;

            addLog(log, 'clockId', id);
          });
        }
      },
      beforeDestroy: (instance) => {
        const { name, wifiId } = instance.dataValues;
        const log = `${name} was deleted from wifi ${wifiId}`;

        addLog(log, 'wifiId', wifiId);
      },
    },
  });
  Clock.associate = (models) => {
    Clock.belongsTo(models.wifi, { constraints: false });
    Clock.hasMany(models.changelog);
  };
  return Clock;
};

export default ClockSchema;
