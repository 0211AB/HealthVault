const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PrescriptionSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true
    },
    sugarLevel: {
        type: String,
    },
    bloodLevel: {
        type: String,
    },
    testsPrescribed: {
        type: String
    },
    medicinesPrescribed: {
        type: String,
    },
    dietPlan: {
        type: String,
    }
}, { timestamps: true })

const Prescription = new mongoose.model('prescription', PrescriptionSchema)

module.exports = Prescription


