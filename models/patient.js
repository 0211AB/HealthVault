const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    validate(value) {
      if (!value) throw new Error(`Name field is required.`);
    },
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate(value) {
      if (!validator.isStrongPassword(value))
        throw new Error(
          `Password must contain the following (i) Minimum 8 characters. (ii) A lowercase letter. (iii) A special character (@, $, !, &, etc). (iv) A number. (v) A uppercase letter.`
        );
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  aadharNumber: {
    type: String,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      if (
        value.toLowerCase() !== "male" &&
        value.toLowerCase() !== "female" &&
        value.toLowerCase() !== "other"
      ) {
        throw new Error("Please input male/female/other as gender");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxLength: 10,
  },
  photo: {
    type: String,
    ref: "uploads.files",
  },
  dob: {
    type: Date,
    required: true,
  },
  bloodGroup: {
    type: String,
  },
  identifcationMark: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  familyHistory: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

PatientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

PatientSchema.methods.generateAuthToken = async function () {
  try {
    if (this.tokens.length > 1) this.tokens.splice(0, 1);
    const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET_KEY);
    this.tokens.push({ token: token });
    return token;
  } catch (e) {
    return e;
  }
};

PatientSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Patient = new mongoose.model("patient", PatientSchema);

module.exports = Patient;
