const User = require("../modals/User");

const profileUpdate = async (req, res) => {
  const updateUser = {};

  req.body.firstname === undefined
    ? ""
    : (updateUser.firstname = req.body.firstname);
  req.body.middlename === undefined
    ? ""
    : (updateUser.middlename = req.body.middlename);
  req.body.lastname === undefined
    ? ""
    : (updateUser.lastname = req.body.lastname);
  req.body.username === undefined
    ? ""
    : (updateUser.username = req.body.username);
  req.body.email === undefined ? "" : (updateUser.email = req.body.email);
  req.body.birthday === undefined
    ? ""
    : (updateUser.birthday = req.body.birthday);
  req.body.gender === undefined ? "" : (updateUser.gender = req.body.gender);
  req.body.profilePhoto === undefined
    ? ""
    : (updateUser.profilePhoto = req.body.profilePhoto);

  try {
    const findUser = await User.findByIdAndUpdate(req.params.id, {
      $set: updateUser,
    });

    if (findUser) {
      res.send("login user document updated!");
    }
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
  profileUpdate,
};
