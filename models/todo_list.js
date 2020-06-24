const { sequelize } = require('.')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'todo_list',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // todoId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      importance: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'todo_list',
    }
  )
}
