module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING(50), allowNull: false },
    last_name: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM('User', 'Admin'), defaultValue: 'User' },
    status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
    join_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    last_login: { type: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = models => {
    User.hasOne(models.AdminProfile, { foreignKey: 'admin_id' });
    User.hasMany(models.Order, { foreignKey: 'user_id' });
  };

  return User;
};
