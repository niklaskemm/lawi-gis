module.exports = (sequelize, DataTypes) => {
  var GridGeom = sequelize.define('gridgeom', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: false
    }
  })

  // GridGeom.associate = (models) => {
  //   GridGeom.hasMany(models.radolan_data, {
  //     foreignKey: "grid_id"
  //   })
  // }

  return GridGeom
}