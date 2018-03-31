const LightSchema = (sequelize, DataTypes) => {
  const Light = sequelize.define('light', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    charging: DataTypes.BOOLEAN,
    color: DataTypes.STRING,
    dim: DataTypes.BOOLEAN,
    ip: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    switched_on: DataTypes.BOOLEAN,
    connected_wifi: DataTypes.BOOLEAN,
    wifi_id: DataTypes.INTEGER,
  });

  Light.associate = (models) => {
    Light.belongsTo(models.wifi);
    Light.hasMany(models.changelog);
  };
  return Light;
};

export default LightSchema;
