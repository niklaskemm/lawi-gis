module.exports = (sequelize, DataTypes) => {
  var RadolanTemp = sequelize.define('radolan_temp', {
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: false,
    }
  })
  
  return RadolanTemp
}