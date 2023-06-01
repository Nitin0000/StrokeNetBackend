const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.UserAdder = async (req, res) => {
  const user = User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    password: req.body.password,
    centerId: req.body.centerId,
    userDepartment: req.body.userDepartment,
    userRole: req.body.userRole,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  // const token=user.generateJWT()
  return res.status(200).send(user);
};

module.exports.userUpdater = async (req, res) => {
  const user_incoming = req.body.user;
  const user = await User.findOneAndUpdate(
    { _id: user_incoming.userId },
    {
      $set: {
        firstName: user_incoming.firstName,
        lastName: user_incoming.lastName,
        email: user_incoming.email,
        phoneNo: user_incoming.phoneNo,
        password: user_incoming.password,
        centerId: user_incoming.centerId,
        userDepartment: user_incoming.userDepartment,
        userRole: user_incoming.userRole,
      },
    },
    {
      new: true,
    }
  );
  return res.status(200).send(user);
};
