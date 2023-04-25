const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
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
    },
    Photo: {
        type: String,
        default: "https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50583.jpg?w=740"
    },
    HealthID: {
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
    Dob: {
        type: Date,
    },
    BloodGroup: {
        type: String,
    },
    IdentifcationMark: {
        type: String,
    },
    Height: {
        type: String,
    },
    Weight: {
        type: String,
    },
    FamilyHistory: {
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

UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();

    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

UserSchema.methods.generateAuthToken = async function () {
    try {
        if (this.Tokens.length > 1) this.Tokens.splice(0, 1);
        const token = jwt.sign({ Email: this.Email }, process.env.JWT_SECRET_KEY);
        this.Tokens.push({ token: token });
        return token;
    } catch (e) {
        return e;
    }
};

UserSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
});

const User = new mongoose.model("user", UserSchema);

module.exports = User;
