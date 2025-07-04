module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Order", {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    order_status: { type: DataTypes.STRING },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total_amount: { type: DataTypes.DECIMAL }
  }, {
    tableName: 'orders',
    timestamps: false
  });
};
