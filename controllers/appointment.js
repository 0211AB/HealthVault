const Doctor = require("../models/doctor");
const Patient = require("../models/patient")
const Appointment = require("../models/appointment");
const bcrypt = require("bcryptjs");
var ObjectId = require("mongodb").ObjectId;

exports.createAppointment = async (req, res) => {
    try {
        // console.log(req)
        const pat = await Patient.findOne({ aadharNumber: req.patient.aadharNumber });
        const doc = await Doctor.findOne({ registrationNumber: req.body.registrationNumber });
        var reqBody = {
            ...req.body,
            doctor: doc._id,
            patient: pat._id,
        }

        delete reqBody.registrationNumber
        // console.log(reqBody)
        var apptmt = new Appointment(reqBody);
        const saved_apptmt = await apptmt.save();

        res.status(201).json({ Message: "Appointment Created Succesfully" });
    } catch (e) {
        if (e.code == 11000)
            return res
                .status(400)
                .json({ Message: `${Object.keys(e.keyPattern)[0]} already exists` });

        res.status(404).json({ Message: `${e.message.split(":")[2]}` });
    }
};

exports.getAppointmentDoctor = async (req, res) => {
    const doc = await Doctor.findOne({ email: req.doctor.email });

    Appointment.find({ doctor: doc._id })
        .populate("patient", "name email")
        .populate("doctor", "name email")
        .sort("-createdAt")
        .then((data) => {
            res.json({ data });
        })
        .catch((err) => {
            console.log(err);
            res.json(err)
        });
};

exports.getAppointmentPatient = async (req, res) => {
    const doc = await Patient.findOne({ email: req.patient.email });

    Appointment.find({ patient: doc._id })
        .populate("patient", "name email")
        .populate("doctor", "name email")
        .sort("-createdAt")
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((err) => {
            console.log(err);
            res.json(err)
        });
};