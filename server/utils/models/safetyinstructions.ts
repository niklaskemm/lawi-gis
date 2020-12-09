module.exports = (sequelize, DataTypes) => {
  var SafetyInstructions = sequelize.define('safety_instructions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.BLOB,
    }
    
  })

  SafetyInstructions.associate = (models) => {
    SafetyInstructions.belongsToMany(models.pesticide, {
      through: "pesticide_safety"
    })
  }
  return SafetyInstructions
}