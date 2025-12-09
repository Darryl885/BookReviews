const User = require("../../models/user.model");

const getAllUsers = async () => {
    return await User.findAll({ attributes: ["id", "name", "email"] });
};

module.exports = { getAllUsers };
