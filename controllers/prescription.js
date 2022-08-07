const Doctor = require("../models/doctor");
const Patient = require("../models/patient")
const Prescription = require("../models/prescription");
const bcrypt = require("bcryptjs");
var ObjectId = require("mongodb").ObjectId;

exports.createPrescription = async (req, res) => {
    try {
        console.log(req)
        const doc = await Doctor.findOne({ email: req.doctor.email });
        const pat = await Patient.findOne({ aadharNumber: req.body.patient });
        var reqBody = {
            ...req.body,
            doctor: doc._id,
            patient: pat._id,
        }

        delete reqBody.aadharNumber;
        // console.log(reqBody)
        var prscptn = new Prescription(reqBody);
        const saved_prscptn = await prscptn.save();

        res.status(201).json({ ...saved_prscptn, Message: "Prescription Created Succesfully" });
    } catch (e) {
        if (e.code == 11000)
            return res
                .status(400)
                .json({ Message: `${Object.keys(e.keyPattern)[0]} already exists` });

        res.status(404).json({ Message: `${e.message.split(":")[2]}` });
    }
};

exports.getPrescription = async (req, res) => {
    const aadharNumber = req.params.pid
    console.log(aadharNumber)
    const pat = await Patient.findOne({ aadharNumber });

    Prescription.find({ patient: pat._id })
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

exports.getPostPrescription = async (req, res) => {
    // console.log(req.body)
    const aadharNumber = req.body.aadhar
    // console.log(aadharNumber)
    const pat = await Patient.findOne({ aadharNumber });

    if (!pat)
        res.status(400).json({ 'Error': "No such patient found" })

    Prescription.find({ patient: pat._id })
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