const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
var ObjectId = require("mongodb").ObjectId;
const { faker } = require('@faker-js/faker');
const data = require("../data/in")
const fetch = require('node-fetch');

exports.signupDoctor = async (req, res) => {
    try {

        const HealthCareID = faker.random.alphaNumeric(7)
        var doctor = {
            ...req.body, HealthCareID
        }

        var doc = new Doctor(doctor);
        const token = await doc.generateAuthToken();
        await doc.save();
        res.status(201).json({ token, ID: HealthCareID, Message: "Doctor Sign Up Succesful" });

    } catch (e) {
        res.status(404).json(e);
    }
};

exports.loginDoctor = async (req, res) => {
    try {
        const password = req.body.Password;
        const email = req.body.Email;

        const doctor = await Doctor.findOne({ Email: email });

        if (!doctor) res.status(404).json({ Message: "Doctor not found" });
        else {
            const isPasswordValid = await bcrypt.compare(password, doctor.Password);

            if (isPasswordValid) {
                const token = await doctor.generateAuthToken();
                // const saved_Doctor = await doctor.save();

                res
                    .status(200)
                    .json({ ID: doctor.HealthCareID, token, Message: "Login Successful" });
            } else {
                res.status(400).json({ Message: "Incorrect Credentials" });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
};

exports.verifyDoctor = async (req, res) => {
    try {
        const password = req.body.Password;
        const email = req.body.Email;

        const doctor = await Doctor.findOne({ Email: email });

        if (!doctor) res.status(404).json({ Message: "Doctor not found" });
        else {
            const isPasswordValid = await bcrypt.compare(password, doctor.Password);

            if (isPasswordValid) {
                res
                    .status(200)
                    .json({ Message: "Verification Successful" });
            } else {
                res.status(400).json({ Message: "Incorrect Credentials" });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select('Name Speciality Photo Location HealthCareID');
        res.status(201).json(doctors);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getDoctorDetails = async (req, res) => {
    try {
        res.status(200).json(req.doctor);

    } catch (e) {
        res.status(404).json(e);
    }
};

exports.queryDoctors = async (req, res) => {
    try {

        var request = {}
        if (req.body.Name !== undefined)
            request = { ...request, $text: { $search: `${req.body.Name}` } }
        if (req.body.Time !== undefined)
            request = { ...request, Timing: req.body.Time }
        if (req.body.Speciality !== undefined)
            request = { ...request, Speciality: req.body.Speciality }
        if (req.body.Location !== undefined && request.$text === undefined) {

            const geodata = await fetch(
                `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?city=${encodeURIComponent(req.body.Location)}&country=India&accept-language=en`,
                {
                    headers: {
                        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
                        "x-rapidapi-key":
                            "7449b52200msh1221ff45cc1eb7ap10d0c2jsn7f19c18f3385",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );

            const gData = await geodata.json();

            request = {
                ...request, Coordinates: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [Number(gData !== undefined && gData[0] !== undefined ? gData[0]?.lon : 78.92), Number(gData !== undefined && gData[0] !== undefined ? gData[0]?.lat : 20.59)],
                        }
                    }
                }
            }
        }

        const doctors = await Doctor.find(request).select('Name Speciality Photo Location HealthCareID');
        res.status(201).json(doctors);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.updateDoctor = async (req, res) => {
    try {

        if (req.body.Location !== undefined) {

            const geodata = await fetch(
                `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?city=${encodeURIComponent(req.body.Location)}&country=India&accept-language=en`,
                {
                    headers: {
                        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
                        "x-rapidapi-key":
                            "7449b52200msh1221ff45cc1eb7ap10d0c2jsn7f19c18f3385",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );

            const gData = await geodata.json();

            req.body = {
                ...req.body, Coordinates: [Number(gData !== undefined && gData[0] !== undefined ? gData[0]?.lon : 78.92), Number(gData !== undefined && gData[0] !== undefined ? gData[0]?.lat : 20.59)]
            }
        }

        const doctor = await Doctor.updateOne({ Email: req.doctor.Email }, req.body)
        res.status(201).json({ doctor, Message: "Updated Your Account" });

    } catch (e) {
        console.log(e)
        res.status(404).json({ e, Message: "The Data You Entered Already Exists" });
    }
}