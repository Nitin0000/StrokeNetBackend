const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.user.email });
  if (user) {
    const validpwd = await bcrypt.compare(
      req.body.user.password,
      user.password
    );
    if (validpwd) res.status(200).send(user);
    else res.status(404).send(false);
  } else {
    return res.status(404).send(false);
  }
};
