const { Schema, model } = require("mongoose");

const otpSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      require: true,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
  },
  { timestamps: true }
);

module.exports.Otp = model("Otp",otpSchema);
