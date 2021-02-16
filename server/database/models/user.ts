const bcrypt = require("bcryptjs")

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { args: true, msg: "Please provide a valid email address." }
        }
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 20],
            msg:
              "The length of the password must not be shorter than 6 characters and must not exceed 20 characters."
          }
        }
      }
    },
    {
      hooks: {
        afterValidate: function (user) {
          user.password = bcrypt.hashSync(user.password, 8)
        }
      }
    }
  )

  User.associate = (models) => {
    User.belongsToMany(models.field, { through: "user_field" })
  }
  return User
}
