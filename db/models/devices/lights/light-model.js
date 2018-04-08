import addLog from './../../../../server/controllers/changelogs/changelog-ctrl';

const LightSchema = (sequelize, DataTypes) => {
  const Light = sequelize.define('light', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    charging: { type: DataTypes.BOOLEAN, defaultValue: true },
    color: { type: DataTypes.STRING, allowNull: false },
    dim: { type: DataTypes.INTEGER, defaultValue: 0 },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      },
    },
    latitude: { type: DataTypes.DECIMAL, allowNull: false },
    longitude: { type: DataTypes.DECIMAL, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    switched_on: { type: DataTypes.BOOLEAN, allowNull: false },
    connected_wifi: { type: DataTypes.BOOLEAN, defaultValue: false },
    wifi_id: { type: DataTypes.INTEGER, allowNull: false },
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
