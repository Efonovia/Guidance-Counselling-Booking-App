import mongoose from "mongoose";

const AppointmentSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null
    },
    studentSchoolId: {
        type: String,
        required: true
    },
    counselorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Counselor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
    },
    cancelled: {
        type: Boolean,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    seen: {
        type: Boolean,
        required: true,
    },
    isReferral: {
        type: Boolean,
        required: true,
        default: false
    },
    referralInfo: {
        type: Object,
        default: null
    },
    note: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Appointment = mongoose.model("Appointment", AppointmentSchema)
export default Appointment