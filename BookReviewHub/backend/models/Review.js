const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/database');
const User = require("./user.model");
const Book = require("./Book");

const Review = sequelize.define("Review", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }, //  Note entre 1 et 5
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
    bookId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Book, key: "id" } },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

//  Associe un utilisateur à ses critiques
User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId" });

//  Associe un livre à ses critiques
Book.hasMany(Review, { foreignKey: "bookId", onDelete: "CASCADE" });
Review.belongsTo(Book, { foreignKey: "bookId" });

module.exports = Review;
