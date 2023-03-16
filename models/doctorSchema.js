const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  specialization: String,
  contact: String,
  filled_slots: [
    {
      date: Date,
      phone_number: String,
      email: String,
      name: String,
    },
  ],
  tokens: [
    {
      token: String,
    },
  ],
});

// Hashing the password before create a new influencer
doctorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Generating the token
doctorSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      { _id: this._id },
      "VANAMGANGIREDDYKATAMVIJAYADURGAMANITEJA"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;
