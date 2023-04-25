const User = require("../models/user");
const bcrypt = require("bcryptjs");
var ObjectId = require("mongodb").ObjectId;
// const cloudinary = require("cloudinary")
const { faker } = require('@faker-js/faker');
const data = require("../data/in")
const fetch = require('node-fetch');
const Doctor = require("../models/doctor");


// cloudinary.config({
//     cloud_name: 'dnakkgua2',
//     api_key: '286353953679126',
//     api_secret: 'ZRGq-FiWZprx3SbdKqYA_pOXAfU'
// });

exports.signupUser = async (req, res) => {
    try {

        const HealthID = faker.random.alphaNumeric(10)
        var user = {
            ...req.body, HealthID
        }

        var usr = new User(user);
        const token = await usr.generateAuthToken();
        await usr.save();
        res.status(201).json({ token, ID: HealthID, Message: "User Sign Up Succesful" });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const password = req.body.Password;
        const email = req.body.Email;

        const user = await User.findOne({ Email: email });

        if (!user) res.status(404).json({ Message: "User not found" });
        else {
            const isPasswordValid = await bcrypt.compare(password, user.Password);

            if (isPasswordValid) {
                const token = await user.generateAuthToken();
                // const saved_user = await user.save();

                res
                    .status(200)
                    .json({ ID: user.HealthID, token, Message: "Login Successful" });
            } else {
                res.status(400).json({ Message: "Incorrect Credentials" });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
};

exports.verifyUser = async (req, res) => {
    try {
        const password = req.body.Password;
        const email = req.body.Email;

        const user = await User.findOne({ Email: email });

        if (!user) res.status(404).json({ Message: "User not found" });
        else {
            const isPasswordValid = await bcrypt.compare(password, user.Password);

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

exports.getDoctorDetails = async (req, res) => {
    try {
        var id = req.params.id;
        var o_id = new ObjectId(id);
        const docs = await Doctor.findById({ _id: o_id }).select('-_id -Password -Tokens -Mobile -Gender -Coordinates')
        res.status(201).json(docs);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        res.status(200).json(req.user);

    } catch (e) {
        res.status(404).json(e);
    }
};

exports.queryusers = async (req, res) => {
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

        const users = await User.find(request).select('Name Speciality Photo Location HealthCareID');
        res.status(201).json(users);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.updateUser = async (req, res) => {
    try {

        const user = await User.updateOne({ Email: req.user.Email }, req.body)
        res.status(201).json({ user, Message: "Updated Your Account" });

    } catch (e) {
        console.log(e)
        res.status(404).json({ e, Message: "The Data You Entered Already Exists" });
    }
}