const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/database');
const User = require('./user.model');

const Book = sequelize.define("Book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  coverImage: { type: DataTypes.STRING },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  }
}, {
  timestamps: true
});

// Relations
User.hasMany(Book, { foreignKey: "userId", onDelete: "CASCADE" });
Book.belongsTo(User, { foreignKey: "userId" });

module.exports = Book;
