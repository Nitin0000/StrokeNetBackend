const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
require("dotenv/config");

const sendemail = async (email, OTP) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.OWNER_EMAIL,
      pass: process.env.OWNER_PASS,
    },
  });
  const mailOptions = {
    from: process.env.OWNER_EMAIL,
    to: email,
    subject: "MessServer",
    text: `Your OTP is ${OTP}`,
  };
  var sended = await transporter.sendMail(mailOptions);
  return sended;
};

const { User } = require("../model/userModel");
const { Otp } = require("../model/otpModel");

module.exports.userExistance =  async(req,res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) return res.send(true);
  return res.send(false);
}

module.exports.signUp = async (req, res) => {
  const OTP = otpGenerator.generate(6, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
  const email = req.body.email;
  console.log(OTP);
  const otp = new Otp({ email: email, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  await otp.save();
  // sendemail(email, OTP)
  //   .then((info) => {
  //     return res.status(200).send("OTP SENDED SUCCESSFULLY");
  //   })
  //   .catch((err) => {
  //     return res.status(404).send("Sorry Unable to reload");
  //   });
  setTimeout(() => {
    return res.status(200).send("OTP SENDED SUCCESSFULLY");
  }, 1000);
};

module.exports.verifyOtp = async (req, res) => {
  const otpHolder = await Otp.find({
    email: req.body.email,
  });
  const n = otpHolder.length;
  if (n === 0) return res.send(false);
  const validotp = await bcrypt.compare(req.body.otp, otpHolder[n - 1].otp);
  if (validotp) {
    await Otp.deleteMany({ email: otpHolder[0].email });
    return res.send(true);
  } else {
    return res.send(false);
  }
};
