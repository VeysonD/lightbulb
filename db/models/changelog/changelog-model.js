const ChangelogSchema = (sequelize, DataTypes) => {
  const Changelog = sequelize.define('changelog', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    log: DataTypes.STRING,
  });

  Changelog.associate = (models) => {
    Changelog.belongsTo(models.light, { onDelete: 'CASCADE' });
    Changelog.belongsTo(models.clock, { onDelete: 'CASCADE' });
    Changelog.belongsTo(models.wifi, { onDelete: 'CASCADE' });
  };
  return Changelog;
};

export default ChangelogSchema;
