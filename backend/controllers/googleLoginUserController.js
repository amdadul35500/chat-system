const User = require("../modals/User");

const getGoogleLoginUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.status(200).json(user);
};

module.exports = {
  getGoogleLoginUser,
};
