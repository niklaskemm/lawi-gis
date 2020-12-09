module.exports = (sequelize, DataTypes) => {
  var Crop = sequelize.define('crop', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Crop.associate = (models) => {
    Crop.hasMany(models.field, {
      foreignKey: "crop_id"
    })
  }
  return Crop
}