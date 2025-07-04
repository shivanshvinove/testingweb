module.exports = (sequelize, DataTypes) => {
  return sequelize.define("AdminProfile", {
    admin_id: { type: DataTypes.INTEGER, primaryKey: true },
    profile_picture: { type: DataTypes.STRING },
    full_name: { type: DataTypes.STRING(100) },
    contact_number: { type: DataTypes.STRING }
  }, {
    tableName: 'admin_profiles',
    timestamps: false
  });
};
