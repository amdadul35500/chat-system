const User = require("../modals/User");

const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};

module.exports = {
  getSingleUser,
};
