const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const login = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        findUser.password
      );

      if (isValidPassword) {
        const userObject = {
          username: findUser.username,
          email: findUser.email,
          userId: findUser._id,
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        res.status(200).json(findUser);
      } else {
        res.status(404).send("Worng passwprd!");
      }
    } else {
      res.status(404).send("Email is not valid!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const logout = (req, res) => {
  console.log(process.env.COOKIE_NAME);
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
};

module.exports = {
  login,
  logout,
};
