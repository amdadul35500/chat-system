const jwt = require("jsonwebtoken");

// auth guard to protect routes that need authentication
const checkLogin = (req, res) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      res.status(200).send("coockie exist!");
    } catch (err) {
      res.status(500).json("Authentication failure!");
    }
  } else {
    res.status(401).send("coockie not exixt!");
  }
};

module.exports = {
  checkLogin,
};
