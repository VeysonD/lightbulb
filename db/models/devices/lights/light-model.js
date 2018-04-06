import addLog from './../../../../server/utils/logger';

const LightSchema = (sequelize, DataTypes) => {
  const Light = sequelize.define('light', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    charging: DataTypes.BOOLEAN,
    color: { type: DataTypes.STRING, allowNull: false },
    dim: DataTypes.INTEGER,
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      },
    },
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    location: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    switched_on: { type: DataTypes.BOOLEAN, allowNull: false },
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
            const log = `${name}'s ${change} changed from ${prev} to ${curr}`;
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
