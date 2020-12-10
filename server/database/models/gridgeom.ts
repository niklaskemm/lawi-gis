module.exports = (sequelize, DataTypes) => {
  var GridGeom = sequelize.define('gridgeom', {
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: false
    },
    // centroid: {
    //   type:DataTypes.GEOMETRY,
    //   allowNull: false
    // }
  })

  // GridGeom.associate = (models) => {
  //   GridGeom.hasMany(models.radolan_data, {
  //     foreignKey: "grid_id"
  //   })
  // }

  return GridGeom
}