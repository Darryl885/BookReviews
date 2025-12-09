const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");
const User = require("./user.model");
const Review = require("./Review");

const ReviewLike = sequelize.define("ReviewLike", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
    reviewId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Review, key: "id" } },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

//  Relation : Un utilisateur peut aimer plusieurs critiques
User.hasMany(ReviewLike, { foreignKey: "userId", onDelete: "CASCADE" });
ReviewLike.belongsTo(User, { foreignKey: "userId" });

//  Relation : Une critique peut recevoir plusieurs likes
Review.hasMany(ReviewLike, { foreignKey: "reviewId", onDelete: "CASCADE" });
ReviewLike.belongsTo(Review, { foreignKey: "reviewId" });

module.exports = ReviewLike;
