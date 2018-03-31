const ChangelogSchema = (sequelize, DataTypes) => {
  const Changelog = sequelize.define('changelog', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    log: DataTypes.STRING,
  });

  Changelog.associate = function ChangelogAssociate(models) {
    Changelog.belongsTo(models.light);
    Changelog.belongsTo(models.clock);
    Changelog.belongsTo(models.wifi);
  };
  return Changelog;
};

export default ChangelogSchema;
