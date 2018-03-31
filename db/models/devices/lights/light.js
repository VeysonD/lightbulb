const LightSchema = (sequelize, DataTypes) => {
  const Light = sequelize.define('light', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    charging: DataTypes.BOOLEAN,
    color: DataTypes.STRING,
    dim: DataTypes.BOOLEAN,
    ip: DataTypes.STRING,
    location: DataTypes.GEOMETRY,
    on: DataTypes.BOOLEAN,
  });

  Light.associate = (models) => {
    Light.belongsTo(models.wifi);
    Light.hasMany(models.changelog);
  };
  return Light;
};

export default LightSchema;
