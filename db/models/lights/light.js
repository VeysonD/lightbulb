const LightSchema = (sequelize, DataTypes) => {
  const Light = sequelize.define('light', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    color: DataTypes.STRING,
    charging: DataTypes.BOOLEAN,
    dim: DataTypes.BOOLEAN,
    ip: DataTypes.STRING,
    location: DataTypes.GEOMETRY,
    on: DataTypes.BOOLEAN,
  });

  Light.associate = (models) => {
    Light.belongsTo(models.wifi);
  };
  return Light;
};

export default LightSchema;
