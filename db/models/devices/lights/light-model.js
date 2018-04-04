import addLog from './../../../../server/api/utils/logger';

const LightSchema = (sequelize, DataTypes) => {
  const Light = sequelize.define('light', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    charging: DataTypes.BOOLEAN,
    color: DataTypes.STRING,
    dim: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    switched_on: DataTypes.BOOLEAN,
    connected_wifi: DataTypes.BOOLEAN,
    wifi_id: DataTypes.INTEGER,
    wifi_pass: DataTypes.STRING,
  }, {
    hooks: {
      beforeUpdate: (instance) => {
        const changed = instance.changed().filter(field => field !== 'updatedAt');
        if (changed.length !== 0) {
          const { id, name } = instance.dataValues;
          changed.forEach((change) => {
            const prev = instance.previous(change);
            const curr = instance.dataValues[change];
            const log = `${name}'s ${change} changed to ${curr} from ${prev}`;
            addLog(log, 'lightId', id);
          });
        }
      },
    },
  });

  Light.associate = (models) => {
    Light.belongsTo(models.wifi);
    Light.hasMany(models.changelog);
  };
  return Light;
};

export default LightSchema;
