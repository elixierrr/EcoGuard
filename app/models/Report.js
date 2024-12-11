const { DataTypes } = require('sequelize');
const database = require('#services/db.service');

const Report = database.define(
  'Report',
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('Air Pollution', 'Waste Management', 'Water Pollution'),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    severity: {
      type: DataTypes.ENUM('High', 'Medium', 'Low'),
      allowNull: false
    },
    reportContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER, // Relasi ke tabel User (atau tipe lain sesuai kebutuhan)
      allowNull: false
    }
  },
  {
    timestamps: true,
    paranoid: true // Soft delete
  }
);

Report.associate = (models) => {
  // Report dibuat oleh User
  Report.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
};

module.exports = Report;