const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.UserAdder = async (req, res) => {
  const user = User({
    email: req.body.email,
    password: req.body.password,
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
        name: user_incoming.name,
        sid: user_incoming.sid,
        roomNumber: user_incoming.roomNumber,
        roomSize: user_incoming.roomSize,
        hostel: user_incoming.hostel,
        block: user_incoming.block,
      },
    },
    {
      new: true,
    }
  ); 
  return res.status(200).send(user);
};
