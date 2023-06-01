const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    sid: {
      type: String,
    },
    roomSize: {
      type: Number,
    },
    hostel: {
      type: String,
    },
    block: {
      type: String,
    },
    roomNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.name,
      roomNumber:this.roomNumber,
      block:this.block,
      sid:this.sid,
      hostel:this.hostel,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
  return token;
};

module.exports.User = model("User", userSchema);
