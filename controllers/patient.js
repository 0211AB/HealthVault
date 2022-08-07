const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");
var ObjectId = require("mongodb").ObjectId;

exports.signupPatient = async (req, res) => {
    try {
        // console.log(req.body)    
        // console.log(req.file)
        var reqBody = {
            ...req.body,
            photo: req.file.filename
        }
        delete reqBody.image
        // console.log(reqBody)
        var patient = new Patient(reqBody);
        const token = await patient.generateAuthToken();

        const saved_patient = await patient.save();

        res.status(201).json({ ...saved_patient._doc, Message: "Patient Sign Up Succesful" });
    } catch (e) {
        if (e.code == 11000)
            return res
                .status(400)
                .json({ Message: `${Object.keys(e.keyPattern)[0]} already exists` });

        res.status(404).json({ Message: `${e.message.split(":")[2]}` });
    }
};

exports.loginPatient = async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;

        const patient = await Patient.findOne({ email });
        if (!patient) res.status(404).json({ Error: "Patient not found" });
        else {
            const isPasswordValid = await bcrypt.compare(password, patient.password);

            if (isPasswordValid) {
                const token = await patient.generateAuthToken();
                const saved_patient = await patient.save();

                res.status(200).json({ ...saved_patient._doc, Message: "Login Successful" });
            } else {
                res.status(400).json({ Message: "Incorrect Credentials" });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
};

exports.updatePatient = async (req, res) => {
    try {

        const aadharNumber = req.params.uid;
        const reqBody = { ...req.body };
        // console.log(reqBody)

        const patient = await Patient.findOne({ aadharNumber })
        if (!patient) res.status(404).json({ Error: "Invalid Credentials" });
        else {
            for (const [key, value] of Object.entries(reqBody)) {
                if (value !== '')
                    patient[key] = value;
            }
            if (req.file != null)
                patient.photo = req.file.filename
            // console.log(patient);
            const token = await patient.generateAuthToken();
            const saved_patient = await patient.save();
            res.status(200).json({ ...saved_patient._doc, Message: "Patient updated sucessfully" });
        }
    } catch (e) {
        console.log(e)
        if (e.code == 11000)
            return res
                .status(400)
                .json({ Message: `${Object.keys(e.keyPattern)[0]} already exists` });

        res.status(404).json({ Message: `${e.message.split(":")[2]}` });
    }
};

exports.patientProfile = async (req, res) => {
    try {
        // console.log(req.patient)
        res.status(200).json(req.patient);
    } catch (e) {
        // console.log(e);
        return res.status(404).json(e)
    }
};

exports.logoutPatient = async (req, res) => {
    try {
        const email = req.patient.email
        const patient = await Patient.findOne({ email })
        if (!patient)
            res.status(404).json({ "Error": "Patient not found" })
        else {

            patient.tokens = []
            await patient.save()

            res.status(200).json({ "Message": "Logged Out succesfully!!" })

        }
    }
    catch (e) {
        res.status(404).json(e)
    }
}