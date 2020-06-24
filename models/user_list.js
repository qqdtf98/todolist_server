const { sequelize } = require('.')
const models = require('./index')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user_list',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'user_list',
    }
  )

  user.associate = function (models) {
    models.user_list.hasMany(models.todo_list, {
      foreignKey: 'todoId',
      onDelete: 'cascade',
    })
  }

  user.associate = function (models) {
    models.user_list.hasMany(models.done_list, {
      foreignKey: 'doneId',
      onDelete: 'cascade',
    })
  }

  return user
}
