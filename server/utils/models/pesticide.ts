module.exports = (sequelize, DataTypes) => {
  var Pesticide = sequelize.define('pesticide', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    barcode: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        isAlphanumeric: true
      }
    }
  })

  Pesticide.associates = (models) => {
    Pesticide.belongsToMany(models.field, {
      through: "field_pesticide"
    }),
    Pesticide.belongsToMany(models.safety_instructions, {
      through: "pesticide_safety"
    })
  }
  
  return Pesticide
}