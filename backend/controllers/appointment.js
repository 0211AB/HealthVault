const User = require("../models/user");
const Appointment = require("../models/appointment")
const Doctor = require("../models/doctor")

var ObjectId = require("mongodb").ObjectId;
const { faker } = require('@faker-js/faker');

exports.newAppointment = async (req, res) => {
    try {
        var request = req.body
        request = { ...request, Name: req.user.Name, UserID: req.user.HealthID }
        var oldApp = await Appointment.findOne(req.body)
        if (oldApp !== null)
            return res.status(404).json({ Message: "An Appointment Already Exists At The Requested Time Slot" });

        var app = new Appointment(request);
        await app.save();
        res.status(201).json({ Message: "Appointment Creation Sucessful" });

    } catch (e) {
        // console.log(e)
        res.status(404).json(e);
    }
};

exports.listAppointments = async (req, res) => {
    try {
        var request = { Name: req.user.Name, UserID: req.user.HealthID, Status: "Pending" }
        var apps = await Appointment.find(request)

        res.status(201).json(apps);

    } catch (e) {
        // console.log(e)
        res.status(404).json(e);
    }
};

exports.listDoctorAppointments = async (req, res) => {
    try {
        var request = { DName: req.doctor.Name, Status: "Pending" }
        var apps = await Appointment.find(request)

        res.status(201).json(apps);

    } catch (e) {
        // console.log(e)
        res.status(404).json(e);
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        var request = { ...req.body, Name: req.user.Name, UserID: req.user.HealthID }
        var apps = await Appointment.deleteOne(request)

        res.status(201).json({ Message: "Deleted Sucessfully" });

    } catch (e) {
        // console.log(e)
        res.status(404).json(e);
    }
};

exports.cancelDoctorAppointment = async (req, res) => {
    try {
        var request = { ...req.body }
        var apps = await Appointment.deleteOne(request)

        res.status(201).json({ Message: "Deleted Sucessfully" });

    } catch (e) {
        // console.log(e)
        res.status(404).json(e);
    }
};

exports.finishAppointment = async (req, res) => {
    try {
        var request = { ...req.body }
        var apps = await Appointment.findOne(request)
        apps.Status = "Finished"
        await apps.save()

        res.status(201).json({ Message: "Finished Sucessfully" });

    } catch (e) {
        // console.log(e)
        res.status(404).json(e);
    }
};