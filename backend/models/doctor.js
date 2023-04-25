const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const DoctorSchema = new mongoose.Schema({
    Name: {
        type: String,
        trim: true,
        required: [true, 'Name is Required']
    },
    Password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: 8,
    },
    Email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email is Required'],
        unique: true,
        validate: {
            validator: async function (value) {
                const count = await this.constructor.countDocuments({ Email: value });
                return count === 0;
            },
            message: '"Email Already Exists"',
        },
    },
    Address: {
        type: String,
        trim: true,
        required: true,
    },
    Photo: {
        type: String,
        default: "https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=1060&t=st=1682069753~exp=1682070353~hmac=651dbb007547f3067b7fdc2a3c7945a666d7f89b746a18b818289ad8baf48d79"
    },
    HealthCareID: {
        type: String,
        unique: true,
        required: true,
    },
    Gender: {
        type: String,
    },
    Mobile: {
        type: String,
        unique: true,
        validate: {
            validator: async function (value) {
                const count = await this.constructor.countDocuments({ Mobile: value });
                return count === 0;
            },
            message: '"Mobile Already Exists"',
        },
        minlength: 10,
        maxLength: 10,
    },
    Timing: {
        type: String,
    },
    Location: {
        type: String,
    },
    Coordinates: {
        type: [Number],
    },
    Fees: {
        type: String,
    },
    Experience: {
        type: String,
    },
    Speciality: {
        type: String,
    },
    College: {
        type: String,
    },
    Tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

DoctorSchema.index({ Name: 'text' });
DoctorSchema.index({ Coordinates: '2dsphere' });

DoctorSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();

    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

DoctorSchema.methods.generateAuthToken = async function () {
    try {
        if (this.Tokens.length > 1) this.Tokens.splice(0, 1);
        const token = jwt.sign({ email: this.Email }, process.env.JWT_SECRET_KEY);
        this.Tokens.push({ token: token });
        return token;
    } catch (e) {
        return e;
    }
};

DoctorSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
});

const Doctor = new mongoose.model("doctor", DoctorSchema);

module.exports = Doctor;
