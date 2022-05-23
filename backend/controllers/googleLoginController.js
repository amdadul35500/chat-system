const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  // generate token
  const token = jwt.sign(
    { name: "Amdadul Haque", age: 23, email: "amdadul35500@gmail.com" },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );

  // set cookie
  res.cookie(process.env.COOKIE_NAME, token, {
    maxAge: process.env.JWT_EXPIRY,
    httpOnly: true,
    signed: true,
  });

  res.send("google login successfull!");
};

module.exports = {
  googleLogin,
};
