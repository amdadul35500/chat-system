const User = require("../modals/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const existEmail = await User.findOne({ email: req.body.email });

  if (!existEmail) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hashedPassword });
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } else {
      const newUser = new User(req.body);
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    }
  } else {
    res.status(404).send("Email alrady exist!");
  }
};

module.exports = {
  signup,
};
