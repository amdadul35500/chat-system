const User = require("../modals/User");

const getAllUser = async (req, res) => {
  const allUser = await User.find();
  res.status(200).json(allUser);
};

module.exports = {
  getAllUser,
};
