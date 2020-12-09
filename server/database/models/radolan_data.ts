module.exports = (sequelize, DataTypes) => {
  var RadolanData = sequelize.define('radolan_data', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  })

  RadolanData.associate = (models) => {
    RadolanData.belongsTo(models.gridgeom, {
      foreignKey: "grid_id"
    })
  }
  
  return RadolanData
}