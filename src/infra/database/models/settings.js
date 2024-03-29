module.exports = (sequelize, DataTypes) => {
  const settings = sequelize.define('settings', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    value: DataTypes.TEXT
  }, {
    underscored: false
  })
  settings.associate = function (models) {
    // associations can be defined here
  }
  return settings
}
