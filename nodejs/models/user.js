const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //Maybe
    //const User = sequelize.define('User', { name: DataTypes.STRING });
    //User.belongsToMany(Task, { through: 'UserTasks' });
    static associate(models) {
      User.hasMany(models.Task);
    }
  }
  User.init({
    slackUserID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slackOrganizationID: {
      type: DataTypes.STRING,
    },
    slackWorkspaceID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
