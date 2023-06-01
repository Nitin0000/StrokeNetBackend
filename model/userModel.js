const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    emailAddress: {
      type: String,
      require: true,
    },
    mobileNumber: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    centerId: {
      type: String,
      require: true,
    },
    userDepartment: {
      type: String,
      require: true,
    },
    userRole: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this.id,

    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
  return token;
};

module.exports.User = model("User", userSchema);
