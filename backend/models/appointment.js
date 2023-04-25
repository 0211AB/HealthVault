const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const AppointmentSchema = new mongoose.Schema({
    Name: {
        type: String,
        trim: true,
        required: [true, 'Name is Required']
    },
    DName: {
        type: String,
        trim: true,
        required: [true, 'DName is Required']
    },
    UserID: {
        type: String,
        required: [true, 'UserID is Required'],
    },
    DoctorID: {
        type: String,
        required: [true, 'Doctor is Required'],
    },
    Timing: {
        type: String,
        required: true,
    },
    Day: {
        type: Date,
        required: true,
    },
    Status: {
        type: String,
        default:"Pending"
    },
});

const Appointment = new mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
