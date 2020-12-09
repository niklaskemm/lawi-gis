module.exports = (sequelize, DataTypes) => {
  var Field = sequelize.define('field', {
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

  Field.associate = (models) => {
    Field.belongsToMany(models.user, {
      through: "user_field"
    })
    Field.belongsToMany(models.pesticide, {
      through: "field_pesticide"
    })
    Field.belongsTo(models.crop, {
      foreignKey: "crop_id"
    })
  }

  return Field
}
