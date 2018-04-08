const ChangelogSchema = (sequelize, DataTypes) => {
  const Changelog = sequelize.define('Changelog', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    log: DataTypes.STRING,
  });

  Changelog.associate = (models) => {
    Changelog.belongsTo(models.Light, { constraints: false, onDelete: 'CASCADE' });
    Changelog.belongsTo(models.Clock, { constraints: false, onDelete: 'CASCADE' });
    Changelog.belongsTo(models.Wifi, { constraints: false, onDelete: 'CASCADE' });
  };
  return Changelog;
};

export default ChangelogSchema;
