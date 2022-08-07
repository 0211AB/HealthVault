const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'patient',
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    day:{
        type:Date,
        required:true,
        expires:'1h'
    }
}, { timestamps: true })

const Appointment = new mongoose.model('appointment', AppointmentSchema)

module.exports = Appointment


