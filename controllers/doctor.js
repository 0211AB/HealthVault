const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
var ObjectId = require("mongodb").ObjectId;

exports.signupDoctor = async (req, res) => {
    try {
        var reqBody = {
            ...req.body,
            photo: req.file.filename
        }
        delete reqBody.image
        // console.log(reqBody)
        var doctor = new Doctor(reqBody);
        const token = await doctor.generateAuthToken();

        const saved_Doctor = await doctor.save();

        res.status(201).json({ ...saved_Doctor._doc, Message: "Doctor Sign Up Succesful" });
    } catch (e) {
        // console.log(e)
        if (e.code == 11000)
            return res
                .status(400)
                .json({ Message: `${Object.keys(e.keyPattern)[0]} already exists` });

        res.status(404).json({ Message: `${e.message.split(":")[2]}` });
    }
};

exports.loginDoctor = async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;

        const doctor = await Doctor.findOne({ email });
        if (!doctor) res.status(404).json({ Error: "Doctor not found" });
        else {
            const isPasswordValid = await bcrypt.compare(password, doctor.password);

            if (isPasswordValid) {
                const token = await doctor.generateAuthToken();
                const saved_Doctor = await doctor.save();

                res.status(200).json({ ...saved_Doctor._doc, Message: "Login Successful" });
            } else {
                res.status(400).json({ Message: "Incorrect Credentials" });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const registrationNumber = req.params.uid;
        const reqBody = { ...req.body };
        // console.log(reqBody)

        const doctor = await Doctor.findOne({ registrationNumber })
        if (!doctor) res.status(404).json({ Error: "Invalid Credentials" });
        else {
            for (const [key, value] of Object.entries(reqBody)) {
                if (value !== '')
                    doctor[key] = value;
            }
            if (req.file != null)
                doctor.photo = req.file.filename
            // console.log(doctor);
            const token = await doctor.generateAuthToken();
            const saved_doctor = await doctor.save();
            res.status(200).json({ ...saved_doctor._doc, Message: "Doctor updated sucessfully" });
        }
    } catch (e) {
        if (e.code == 11000)
            return res
                .status(400)
                .json({ Message: `${Object.keys(e.keyPattern)[0]} already exists` });

        res.status(404).json({ Message: `${e.message.split(":")[2]}` });
    }
};

exports.doctorProfile = async (req, res) => {
    try {
        res.status(200).json(req.doctor);
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
};

exports.logoutDoctor = async (req, res) => {
    try {
        // console.log(req)
        const email = req.doctor.email
        const doctor = await Doctor.findOne({ email })
        if (!doctor)
            res.status(404).json({ "Error": "Doctor not found" })
        else {

            doctor.tokens = []
            await doctor.save()

            res.status(200).json({ "Message": "Logged Out succesfully!!" })

        }
    }
    catch (e) {
        res.status(404).json(e)
    }
}